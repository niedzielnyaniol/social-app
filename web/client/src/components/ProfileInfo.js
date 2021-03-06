import React from 'react';
import moment from 'moment';

import { Card, Icon, Image } from 'semantic-ui-react';
import UserShape from '../shapes/user';

const ProfileInfo = ({ user }) => (
  <Card>
    <Image src={user.avatarUri} />
    <Card.Content>
      <Card.Header>
        {user.name}
      </Card.Header>
      <Card.Header>
        {user.surname}
      </Card.Header>
      <Card.Meta>
        <span className="date">
          Joined in {user.accountCreatedAt && moment(user.accountCreatedAt.date).year()}
        </span>
      </Card.Meta>
      {
        user.description ?
          <Card.Description>
            {user.description}
          </Card.Description> : null
      }
    </Card.Content>
    {
      user.friends ?
        <Card.Content extra>
          <Icon name="user" />
          {user.friends.length}
        </Card.Content> : null
    }

  </Card>
);

ProfileInfo.propTypes = {
  user: UserShape.isRequired,
};

export default ProfileInfo;
