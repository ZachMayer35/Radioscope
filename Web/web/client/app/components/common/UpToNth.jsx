'use strict';

import React, { PropTypes, Component } from 'react';

const Number = (num, i) => (
  <tr key={i}>
    <td>
      {i + 1}
    </td>
    <td>
      {num}
    </td>
  </tr>
);

class UpToNth extends Component {
  componentWillMount () {
    if (this.props._props.n !== this.props.n){
      this.props.setN(this.props._props.n);
    }
  }
  render () {
    const { n, a, setN } = this.props;
    return (
      <div className='-text'>
        <div className='flex-line'>
          <div className='input-group'>
            <div className='input-group-addon'>N</div>
            <input type='text' className='form-control n' value={n}
              onChange={(e) => (setN(e.target.value))}
              />
          </div>
        </div>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Index</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {a.map((num, i) => (Number(num, i)))}
          </tbody>
        </table>
      </div>
    )
  }
}


UpToNth.propTypes = {
  n: PropTypes.any.isRequired,
  a: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  setN: PropTypes.func.isRequired 
}

export default UpToNth;
