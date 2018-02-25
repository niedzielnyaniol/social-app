import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Feed, Icon, Button, Comment, Form, Accordion } from 'semantic-ui-react';

import PostShape from '../shapes/post';

const Div = styled.div`
  border-bottom: 1px solid rgb(222, 222, 223);
`;

class UserPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  handleClick = () => {
    const state = this.state.active;
    this.setState({ active: !state });
  }

  render() {
    return [
      <Feed.Event key="adwda">
        <Feed.Label image={this.props.post.author.avatarUri} />
        <Feed.Content>
          <Feed.Summary>
            <a href={`/users/${this.props.post.author.id}`}>
              {this.props.post.author.name} {this.props.post.author.surname}
            </a> posted on his page
            <Feed.Date>{moment(this.props.post.createdAt.date).calendar()}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            {this.props.post.content}
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Icon name="like" />
              {this.props.post.likes} Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>,
      <Comment.Group key="dwa" style={{ textAlign: 'left', marginTop: 0 }}>
        <Accordion>
          <Accordion.Title active={this.state.active} onClick={() => { this.handleClick(); }}>
            <Icon name="dropdown" />
            Comments ({this.props.post.comments.length})
          </Accordion.Title>
          <Accordion.Content active={this.state.active}>
            {
              this.props.post.comments.map((el, key) => (
                // eslint-disable-next-line
                <Comment key={key}>
                  <Comment.Avatar src={el.author.avatarUri} />
                  <Comment.Content>
                    <Comment.Author as="a">{el.author.name} {el.author.surname}</Comment.Author>
                    <Comment.Metadata>
                      <div>{moment(el.createdAt.date).calendar()}</div>
                    </Comment.Metadata>
                    <Comment.Text>{el.content}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))
            }
            <Form reply>
              <Form.TextArea />
              <Button content="Add Reply" labelPosition="left" icon="edit" primary />
            </Form>
          </Accordion.Content>
        </Accordion>
      </Comment.Group>,
      <Div key="fid" />,
    ];
  }
}

UserPost.propTypes = {
  post: PostShape.isRequired,
};

export default UserPost;
