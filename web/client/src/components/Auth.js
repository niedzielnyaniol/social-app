import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import HistoryShape from '../shapes/history';

import { requestAuth } from '../modules/user/actions';

export default function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.props.requestAuth(() => {
        const redirectAfterLogin = this.props.location.pathname;
        this.props.history.push(`/login?next=${redirectAfterLogin}`);
      });
    }

    render() {
      return (
        <div>
          { Object.values(this.props.user).length ?
            <Component {...this.props} /> :
            <h1>...loading</h1>
          }
        </div>
      );
    }
  }

  AuthenticatedComponent.defaultProps = {
    user: {},
    requestAuth: () => ({}),
  };

  AuthenticatedComponent.propTypes = {
    history: HistoryShape.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    requestAuth: PropTypes.func,
    user: PropTypes.shape({
      _id: PropTypes.string,
      email: PropTypes.string,
    }),
  };

  const mapStateToProps = (state) => ({
    user: state.user,
  });

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      requestAuth,
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
