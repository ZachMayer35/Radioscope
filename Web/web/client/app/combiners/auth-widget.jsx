'use strict';

import { connect } from 'react-redux';
import AuthWidget from '../components/auth-widget';

const mapStateToProps = (state, props) => {
  return { ...state.user, _props: props };
};

export default connect(mapStateToProps)(AuthWidget);
