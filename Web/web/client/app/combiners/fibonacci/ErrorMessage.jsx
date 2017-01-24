'use strict';

import { connect } from 'react-redux';
import { dismissError } from '../../actions/fibonacci-actions';
import ErrorMessage from '../../components/common/errorMessage';

const mapStateToProps = (state, props) => {
  return { 
    ...state.fibonacci.error, 
    name: 'fibonacci',
    ...props,
  };
};
const mapDispatchToProps = (dispatch) => ({
  dismiss: () => {
    dispatch(dismissError());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
