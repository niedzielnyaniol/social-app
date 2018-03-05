import React, { Component } from 'react';
import { Menu, Card, Feed } from 'semantic-ui-react';

class SideMenu extends Component {
  render() {
    return (
      <Menu text vertical fixed="right" style={{ backgroundColor: '#fefefe', margin: 0 }}>
        <Card style={{
          position: 'fixed', top: 0, bottom: 0, borderRadius: 0,
        }}
        >
          <Card.Content style={{ flexGrow: 'initial' }}>
            <Card.Header>
              Recent Activity
            </Card.Header>
          </Card.Content>
          {
            this.props.friends.map((el) => (
              <Card.Content style={{ flexGrow: 'initial', cursor: 'pointer' }} onClick={() => {}}>
                <Feed>
                  <Feed.Event>
                    <Feed.Label image={el.avatarUri} />
                    <Feed.Content>
                      <Feed.Summary>{el.name} {el.surname}</Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            ))
          }
          <div style={{ borderBottom: '1px solid rgba(34,36,38,.1)' }} />
        </Card>
      </Menu>
    );
  }
}

export default SideMenu;
