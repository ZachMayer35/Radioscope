'use strict';

import React, { PropTypes } from 'react';
import ReduxComponent from '../ReduxComponent';
import ListFilter from './list-filter';
import ListExpanded from './list-expanded';

const FILTER = 'FILTER';
const SELECT = 'SELECT';

class FilterList extends ReduxComponent {
  constructor (props) {
    super(props);
    this.state = {
      filter: '',
      selection: {}
    }
    this.createStore(this.state);
    this.addAction(FILTER, (filter) => ({ type: FILTER, filter }));
    this.addReducer(FILTER, (state, action) => (Object.assign({}, state, { filter: action.filter })));
    this.addAction(SELECT, (item) => ({ type: SELECT, item }));
    this.addReducer(SELECT, (state, action) => (Object.assign({}, state, { selection: action.item })));

    this.changeFilter = this.changeFilter.bind(this);
    this.filterList = this.filterList.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
    this.getSelection = this.getSelection.bind(this);
  }
  componentDidMount () {
    if (this.props.getList) {
      this.props.getList();
    }
  }
  render () {
    const { selection, loading, expanded, toggleExpand, filterFavorites } = this.props;    
    const filter = this.store.getState().filter;
    const filteredList = this.filterList();
    return (<div className='filter-list'>
      <ListFilter className='filter'
        filter={filter}
        onChange={this.changeFilter}
        toggleExpand={toggleExpand}
        expanded={expanded}
        filterFavorites={filterFavorites}/>
      <hr />
      <ListExpanded className='list'
        list={filteredList}
        selected={selection || this.store.getState().selection}
        select={this.changeSelection}
        loading={loading} />
    </div>)
  }
  changeFilter (filter) {
    this.dispatch(this.actions.FILTER(filter));
  }
  filterList () {
    const { list, selection } = this.props;
    const filter = this.store.getState().filter;
    if (filter && filter.length > 0) {
      return list.filter(a => (a.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 || (selection && a.id === selection.id)));
    } else {
      return list;
    }
  }
  changeSelection (selection) {
    if(this.props.select) {
      this.props.select(selection);
    } else {
      this.dispatch(this.actions.SELECT(selection));
    }
    if(this.props.onSelectionChanged){
      this.props.onSelectionChanged(selection);
    }
  }
  getSelection () {
    return this.props.select ? this.props.selection : this.store.getState().selection;
  }
}

FilterList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  selection: PropTypes.object,
  select: PropTypes.func,
  getList: PropTypes.func,
  loading: PropTypes.bool,
  toggleExpand: PropTypes.func,
  expanded: PropTypes.bool,
  filterFavorites: PropTypes.bool,
  onSelectionChanged: PropTypes.func
};

export default FilterList;
