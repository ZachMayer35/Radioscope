import React, { Component, PropTypes } from 'react'
/* A simple dropdown. */
class Select extends Component {
  render() {
    const { options, isFetching, selectOption } = this.props
    if( !isFetching ) {
        return (
            <select className='form-control' value={(options.find(o=>(o.selected)) || {}).id} onChange={e => { selectOption(e.target.value); }}>
                { options.map(o => (<option className='' key={o.id} value={o.id} >{o.name}</option>))}
            </select>
        );
    } else {
        return (
            <span className='form-control'>Loading...</span>
        )
    }
  }
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
  })).isRequired,
  isFetching: PropTypes.bool,
  selectOption: PropTypes.func.isRequired
};

export default Select;