'use-strict'; 

import React, { PropTypes } from 'react';
import ReduxComponent from '../ReduxComponent';
import ListFilter from './list-filter';
import ListHierarchy from './list-hierarchy';

const FILTER_HIERARCHY = 'FILTER_HIERARCHY';
const TOGGLE_FILTER_FAVORITES = 'TOGGLE_FILTER_FAVORITES';
const SELECT = 'SELECT';

class HierarchyList extends ReduxComponent {
  constructor (props) {
    super(props);
    this.state = {
      filter: '',
      filterFavorites: false,
      selection: null
    }
    this.createStore(this.state);
    this.addAction(FILTER_HIERARCHY, (filter) => ({ type: FILTER_HIERARCHY, filter }));
    this.addReducer(FILTER_HIERARCHY, (state, action) => (Object.assign({}, state, { filter: action.filter })));
    this.addAction(TOGGLE_FILTER_FAVORITES, () => ({ type: TOGGLE_FILTER_FAVORITES }));
    this.addReducer(TOGGLE_FILTER_FAVORITES, (state) => (Object.assign({}, state, { filterFavorites: !state.filterFavorites })));
    this.addAction(SELECT, (item) => ({ type: SELECT, item }));
    this.addReducer(SELECT, (state, action) => (Object.assign({}, state, { selection: action.item })));

    this.changeFilter = this.changeFilter.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
    this.filterHierarchyList = this.filterHierarchyList.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
  }
  componentDidMount () {
    if (this.props.getHierarchy) {
      this.props.getHierarchy();
    }
  }
  render () {
    const { 
      nodes,
      selection,      
      isFetching,
      fetched,
      toggleExpand,
      expanded } = this.props;
    const { filter, filterFavorites } = this.store.getState();
    let loading = false;
    if (fetched !== undefined) {
      loading = (!fetched || isFetching);
    }
    const filteredNodes = this.filterHierarchyList(nodes, selection || this.store.getState().selection);
    return (
      <div className='hierarchyScope'>
        <ListFilter className='hierarchy-scope-filter'
          filter={filter}
          onChange={this.changeFilter}
          toggleFavorites={this.toggleFavorites}
          filterFavorites={filterFavorites}
          toggleExpand={toggleExpand}
          expanded={expanded} 
          />
        <hr />
        <div className='hierarchy-scope-list'>
          <ListHierarchy rootName={'hierarchy-root'}
            nodes={filteredNodes}
            isFetching={loading}
            onSelect={this.changeSelection}
            selectedNode={selection || this.store.getState().selection} 
            />
        </div>
      </div>);
  }
  changeFilter (filter) {
    this.dispatch(this.actions.FILTER_HIERARCHY(filter));
  }
  toggleFavorites () {
    this.dispatch(this.actions.TOGGLE_FILTER_FAVORITES());
  }
  filterHierarchyList (unfilteredNodes, selectedNode) {
    let newNodes = JSON.parse(JSON.stringify(unfilteredNodes));
    const { filter, filterFavorites } = this.store.getState();
    if (newNodes && newNodes.length > 0) {
      let selectedId = (selectedNode ? selectedNode.id : undefined);
      const filterHierarchy = (nodes, previousKey) => {
        nodes.forEach((node, index) => {
          if (node.children && node.children.length > 0 && node.id !== selectedId) {
            node.children = filterHierarchy(node.children, node.key, node.path);
          }
        });
        nodes = nodes.filter(node => (
          (node.children && node.children.length > 0) ||
          (filterFavorites ?
            ((node.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 && node.favorite) || node.id === selectedId) :
            node.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 || node.id === selectedId)
        ));
        return nodes;
      };
      return filterHierarchy(newNodes);
    }
    return [];
  }
  changeSelection (selection) {
    if (this.props.changeSelection) {
      this.props.changeSelection(selection);
    } else {
      this.dispatch(this.actions.SELECT(selection));
    }
    if (this.props.onSelectionChanged) {
      this.props.onSelectionChanged(selection);
    }
  }
};

HierarchyList.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    favorite: PropTypes.bool,
    children: PropTypes.array
  })),
  selection: PropTypes.object,
  isChild: PropTypes.bool,
  metadata: PropTypes.object,
  isFetching: PropTypes.bool,
  fetched: PropTypes.bool,
  toggleExpand: PropTypes.func,
  expanded: PropTypes.bool,
  getHierarchy: PropTypes.func,
  changeSelection: PropTypes.func,
  onSelectionChanged: PropTypes.func
}

export default HierarchyList;
