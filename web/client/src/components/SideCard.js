import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

const CardExampleGroups = ({ user }) => (
  <Card>
    <Card.Content style={{ textAlign: 'left' }}>
      <Image floated="right" size="mini" src={user.avatarUri} />
      <Card.Header>
        {user.name} {user.surname}
      </Card.Header>
      <Card.Meta>
        Friends of Elliot
      </Card.Meta>
      <Button fluid>Invite</Button>
    </Card.Content>
  </Card>
);

export default CardExampleGroups;
