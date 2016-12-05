'use strict';

import { connect } from 'react-redux';
import { setNum, fetchFibonacciNumber, incrementNum, decrementNum } from '../../actions/fibonacci-actions';
import Nth from '../../components/fibonacci/Nth';

const mapStateToProps = (state, props) => {
  return { ...state.fibonacci, _props: props };
};
const mapDispatchToProps = (dispatch) => ({
  setN: (num) => {
    dispatch(setNum(num));
    num = parseInt(num);
    if (!isNaN(num)) {
      dispatch(fetchFibonacciNumber());
    }
  },
  increment: () => {
    dispatch(incrementNum());
    dispatch(fetchFibonacciNumber());
  },
  decrement: () => {
    dispatch(decrementNum());
    dispatch(fetchFibonacciNumber());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Nth);
