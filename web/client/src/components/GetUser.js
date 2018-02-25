import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { requestGetUser, requestGetPageData } from '../modules/user/actions';

export default function getUser(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.props.requestGetUser({
        email: 'mac',
      });
      this.props.requestGetPageData();
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  AuthenticatedComponent.defaultProps = {
    requestAuth: () => ({}),
  };

  AuthenticatedComponent.propTypes = {
    requestAuth: PropTypes.func,
  };

  const mapStateToProps = () => ({});

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      requestGetUser,
      requestGetPageData,
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
