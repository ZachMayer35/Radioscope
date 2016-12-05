'use strict';

import React, { PropTypes, Component } from 'react';
import tableRow from './TableRow';

class UpToNth extends Component {
  componentWillMount () {
    if (this.props._props.n !== this.props.n) {
      this.props.setN(this.props._props.n);
    }
  }
  render () {
    const { n, a, setN } = this.props;
    return (
      <div className='flex-item'>
        <div className='flex-line'>
          <div className='input-group'>
            <div className='input-group-addon'>N</div>
            <input type='text' className='form-control n' value={n}
              onChange={(e) => (setN(e.target.value))}
              />
          </div>
        </div>
        <div className='flex-panel'>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Index</th>
                <th>Number</th>
              </tr>
            </thead>
            <tbody>
              {a.map((num, i) => (tableRow(num, i)))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

UpToNth.propTypes = {
  n: PropTypes.any.isRequired,
  a: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  setN: PropTypes.func.isRequired,
  _props: PropTypes.any
};

export default UpToNth;
