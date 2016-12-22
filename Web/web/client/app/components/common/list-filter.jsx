import React, { Component, PropTypes } from 'react'
/* Filter control with optional 'Favorites'' toggle */
class ListFilter extends Component {
  render() {    
    return (
        <div className={ this.props.toggleExpand ? 'scope-filter expandable' : 'scope-filter' }>
            {this.getFilterLine()}
            {this.getFilterActions()}
        </div>      
    );
  }
  getFilterLine () {
    const { filter, onChange, toggleFavorites, filterFavorites } = this.props;
    if( toggleFavorites !== undefined && filterFavorites !== undefined ){
      return (
        <div className='input-group'>
          <div className='input-group-addon'><i className='glyphicon glyphicon-search' /></div>
          <input type='text' placeholder="Search..." className='form-control' value={filter} onChange={e => onChange(e.target.value)}></input>
          <div className='input-group-addon btn' onClick={e=>{toggleFavorites();e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();}}><i className={filterFavorites ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'} /></div>
        </div>
      );
    } else {
      return (
        <div className='input-group'>
          <div className='input-group-addon'><i className='glyphicon glyphicon-search' /></div>
          <input type='text' placeholder="Search..." className='form-control' value={filter} onChange={e => onChange(e.target.value)}></input>        
        </div>
      );
    }
  }
  getFilterActions () {
    if( this.props.toggleExpand ){
      return (
        <button className='btn btn-default' onClick={this.props.toggleExpand}>
          <i className={this.props.expanded ? 'glyphicon glyphicon-resize-small' : 'glyphicon glyphicon-resize-full'} />
        </button>
      )
    } else {
      return '';
    }
  }
};

ListFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleFavorites: PropTypes.func,
  toggleExpand: PropTypes.func,
  expanded: PropTypes.bool,
  filterFavorites: PropTypes.bool
};

export default ListFilter;