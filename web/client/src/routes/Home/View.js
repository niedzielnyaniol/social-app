import React from 'react';

import LoggedIn from './components/LoggedIn';


export default class Home extends React.Component {
  render() {
    return (
      <div>
        <LoggedIn user={this.props.user} />
      </div>
    );
  }
}

