import React from 'react';
import PropTypes from 'prop-types';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';
import UserCard from './ProfileInfo';
import UserShape from '../shapes/user';

const UsersList = ({ users }) => (
  <div>
    <Header as="h1">{users.length} users found</Header>
    <Card.Group itemsPerRow={4}>
      {
          users.map((el, key) => (
            <UserCard user={el} key={key} /> // eslint-disable-line react/no-array-index-key
          ))
      }
    </Card.Group>
  </div>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(UserShape).isRequired,
};

export default UsersList;
