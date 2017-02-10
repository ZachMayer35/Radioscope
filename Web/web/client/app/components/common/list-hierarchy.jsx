import React, { PropTypes } from 'react';
import ReduxComponent from '../ReduxComponent';
import Loader from './loader';

const TOGGLE_HIERARCHY_NODE = 'TOGGLE_HIERARCHY_NODE';
const SETUP_HIERARCHY = 'SETUP_HIERARCHY';
const SET_STATE = 'SET_STATE';
const EXPAND_ALL = 'EXPAND_ALL';
const COLLAPSE_ALL = 'COLLAPSE_ALL';

import '../../../assets/components/hierarchy.less';

/* A hierarchy list view. Renders as a tree. */
class ListHierarchy extends ReduxComponent {
  constructor (props) {
    super(props);    
    this.state = {   
      metadata: null,
      nodes: null
    }    
    this.createStore(this.state);        
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }  
  componentWillMount () {
    this.setupHierarchy(this.props.nodes);
  }
  componentWillReceiveProps (nextProps) {
    this.setupHierarchy(nextProps.nodes, nextProps.selectedNode);
  }
  setupHierarchy (propNodes, selectedNode) {
    const { metadata, nodes } = this.store.getState();  
    if(this.props.isChild){
      this.dispatch(this.actions.SET_STATE(propNodes, (metadata || this.props.metadata)));
    } else {
      this.dispatch(this.actions.SETUP_HIERARCHY(propNodes, selectedNode));
    } 
  }
  render () {
    const { onSelect, rootName, selectedNode, isFetching } = this.props;
    const { nodes, metadata } = this.store.getState();
    const classN = `scope-hierarchy-list ${rootName || ''}`;
    const list = (
        <div className={classN}> 
          {nodes && nodes.length > 0 ?
            nodes.map((node) => (
              <div className={this.getClassName(node)} key={node.id} >
                <div className='nameContainer' onClick={e => { this.handleClick(e, node); } }>
                  <span>{node.name}</span>
                </div>
                { 
                  node.children && 
                  metadata[node.key] && metadata[node.key].open === true && 
                  <ListHierarchy nodes={node.children} onSelect={onSelect} selectedNode={selectedNode} isChild={true} metadata={metadata} />
                }
              </div>
            )) : null}
        </div>
      );    
    return (
      <Loader loading={isFetching} element={list} />
    );
  }
  getClassName (node) {  
    const metadata = this.store.getState().metadata;    
    let className = node.children ?
      metadata[node.key] && metadata[node.key].open === true ?
        'scope-hierarchy-node root open' :
        'scope-hierarchy-node root' :
      'scope-hierarchy-node';
    if (node.children && node.children.length === 0) {
      className += ' no-children';
    }
    if (this.props.selectedNode) {
      if (node.id === this.props.selectedNode.id) {
        node.favorite ? className += ' favorite-selected leaf' : className += ' selected leaf';
      } else if (node.children && node.children.length > 0 && this.props.selectedNode.key.startsWith(node.key)) {
        this.props.selectedNode.favorite ? className += ' favorite-selected' : className += ' selected';
      }
    }
    if (node.favorite) {
      className += ' favorite';
    }
    return className;
  }
  handleClick(e, node) {
    const { onSelect } = this.props;

    if (node.children && e.target.tagName !== 'SPAN') {
      this.dispatch(this.actions.TOGGLE_HIERARCHY_NODE(node));
    }
    if (e.target.tagName === 'SPAN') {
      onSelect(node);
    }
  }
  expandAll () {
    this.dispatch(this.actions.EXPAND_ALL());
  }
  collapseAll () {
    this.dispatch(this.actions.COLLAPSE_ALL());
  }
  actions () {
    return {
      TOGGLE_HIERARCHY_NODE: (node) => ({
        type: TOGGLE_HIERARCHY_NODE,
        node
      }),
      EXPAND_ALL: () => ({
        type: EXPAND_ALL
      }),
      COLLAPSE_ALL: () => ({
        type: COLLAPSE_ALL
      }),
      SETUP_HIERARCHY: (nodes, selectedNode) => ({
        type: SETUP_HIERARCHY,
        nodes,
        selectedNode: (selectedNode || this.props.selectedNode)
      }),
      SET_STATE: (nodes, metadata) => ({
        type: SET_STATE,
        nodes,
        metadata
      })
    };
  }
  reducer (state, action) {
    switch (action.type) {
      case TOGGLE_HIERARCHY_NODE:
        const newMetadata = JSON.parse(JSON.stringify(state.metadata));
        if(newMetadata[action.node.key]) {
          newMetadata[action.node.key].open = !newMetadata[action.node.key].open;
        }
        return Object.assign({}, state, { metadata: newMetadata });
      case EXPAND_ALL:
        const expandMeta = JSON.parse(JSON.stringify(state.metadata));
        for(let key in expandMeta){
          expandMeta[key].open = true;
        }
        return Object.assign({}, state, { metadata: expandMeta });
      case COLLAPSE_ALL:
        const collapseMeta = JSON.parse(JSON.stringify(state.metadata));
        for(let key in collapseMeta){
          collapseMeta[key].open = false;
        }
        return Object.assign({}, state, { metadata: collapseMeta });
      case SETUP_HIERARCHY:      
        let metadata = {};        
        const buildNodes = (nodes, lastKey, lastPath) => {
          nodes.forEach((node, index) => {
            node.path = (lastPath || '') + '/' + node.name;
            node.key = (lastKey || '0') + '|' + node.id.toString();
            if (node.children && node.children.length > 0) {
              let hasSelectedChild = (action.selectedNode !== null && action.selectedNode.key.startsWith(node.key));
              metadata[node.key] = { open: hasSelectedChild };
              buildNodes(node.children, node.key, node.path);
            }
          });
          return nodes;
        }
        const localNodes = buildNodes(JSON.parse(JSON.stringify(action.nodes)));
        return Object.assign({}, state, { metadata, nodes: localNodes });
      case SET_STATE:
        return Object.assign({}, state, { metadata: action.metadata, nodes: action.nodes });
      default:
        return state;
    }
  }
};

ListHierarchy.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    favorite: PropTypes.bool,
    children: PropTypes.array
  })),
  onSelect: PropTypes.func.isRequired,
  selectedNode: PropTypes.object,
  isChild: PropTypes.bool,
  metadata: PropTypes.object
};

export default ListHierarchy;