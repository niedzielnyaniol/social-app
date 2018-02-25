import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import View from './View';

function mapStateToProps(state) {
  return {
    user: state.user,
    pageData: state.pageData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
