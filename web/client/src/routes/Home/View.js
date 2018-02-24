import React from 'react';

import LoggedIn from './components/LoggedIn';
import NotLoggedIn from './components/NotLoggedIn';

import UserShape from '../../shapes/user';
import HistoryShape from '../../shapes/history';

export default class Home extends React.Component {
  render() {
    return (
      Object.values(this.props.user).length ?
        <LoggedIn user={this.props.user} /> :
        <NotLoggedIn history={this.props.history} />
    );
  }
}

Home.defaultProps = {
  user: {},
};

Home.propTypes = {
  history: HistoryShape.isRequired,
  user: UserShape,
};
