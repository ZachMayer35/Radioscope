'use strict';

import { connect } from 'react-redux';
import { setNum, fetchAllFibonacciNumbers } from '../../actions/fibonacci-actions';
import UpToNth from '../../components/fibonacci/UpToNth';

const mapStateToProps = (state, props) => {
  return { ...state.fibonacci, _props: props };
};
const mapDispatchToProps = (dispatch) => ({
  setN: (num) => {
    dispatch(setNum(num));
    num = parseInt(num);
    if (!isNaN(num)) {
      dispatch(fetchAllFibonacciNumbers());
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpToNth);
