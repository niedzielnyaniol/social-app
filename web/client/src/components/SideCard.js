import React from 'react';
import axios from 'axios';
import { Card, Image, Button } from 'semantic-ui-react';

class CardExampleGroups extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false,
      clicked: false,
    };
  }

  invite() {
    this.setState({ clicked: true });

    axios.post('http://localhost:8000/api/invite/send', {
      id: this.props.user.id,
    }).then(() => {
      this.setState({ hidden: true });
    });
  }

  render() {
    return (
      this.state.hidden ? null :
      <Card style={this.state.clicked ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
        <Card.Content style={{ textAlign: 'left' }}>
          <Image floated="right" size="mini" src={this.props.user.avatarUri} />
          <Card.Header>
            <a href={`/users/${this.props.user.id}`}>{this.props.user.name} {this.props.user.surname}</a>
          </Card.Header>
          <Card.Meta>
            {this.props.user.friendsLen} friends
          </Card.Meta>
          <Button fluid onClick={() => this.invite()}>Invite</Button>
        </Card.Content>
      </Card>
    );
  }
}
export default CardExampleGroups;
