import React from 'react';

import LoggedIn from './components/LoggedIn';

import UserShape from '../../shapes/user';

export default class Home extends React.Component {
  render() {
    return (
      <LoggedIn user={this.props.user} />
    );
  }
}

Home.defaultProps = {
  user: {},
};

Home.propTypes = {
  user: UserShape,
};
