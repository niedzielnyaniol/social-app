import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import UsersList from '../../components/UsersList';
import UserShape from '../../shapes/user';

export default class SingleRecipe extends Component {
  constructor(props) {
    super(props);

    this.users = this.props.users;
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.users, this.users)) {
      this.users = nextProps.users;
    }
  }

  render() {
    return (
      this.users.length ?
        <UsersList users={this.users} /> :
        <Header as="h1">No users found</Header>
    );
  }
}

SingleRecipe.defaultProps = {
  users: [],
};

SingleRecipe.propTypes = {
  users: PropTypes.arrayOf(UserShape),
};
