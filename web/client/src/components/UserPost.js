import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

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
      commentData: '',
      comments: [],
      likes: props.post.likes,
    };
  }

  onInputChange(data) {
    this.setState({ commentData: data.value });
  }

  handleClick = () => {
    const state = this.state.active;
    this.setState({ active: !state });
  }

  handleLike = () => {
    axios.post('http://localhost:8000/api/triggerLike', {
      postId: this.props.post.id,
    }).then((data) => {
      this.setState({ likes: data.data.success });
      console.log(data.data.success);
    });
  }

  formSubmit = () => {
    if (this.state.commentData.trim() !== '') {
      this.setState({ commentData: '' });
      const data = {
        userId: this.props.userId,
        postId: this.props.post.id,
        content: this.state.commentData,
      };

      axios.post('http://localhost:8000/api/addComment', data).then((dataa) => {
        const comments = cloneDeep(this.state.comments);
        comments.push(dataa.data.comment);

        this.setState({
          comments,
        });
      });
    }
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
            <Feed.Like onClick={this.handleLike} >
              <Icon name="like" className={this.state.likes.length ? 'active' : ''} active={!!this.state.likes.length} />
              Like ({this.state.likes})
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>,
      <Comment.Group key="dwa" style={{ textAlign: 'left', marginTop: 0 }}>
        <Accordion>
          <Accordion.Title active={this.state.active} onClick={() => { this.handleClick(); }}>
            <Icon name="dropdown" />
            Comments ({this.props.post.comments.length + this.state.comments.length})
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
            {
              this.state.comments.map((el, key) => (
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
              <Form.TextArea
                value={this.state.commentData}
                onInput={(e, d) => this.onInputChange(d)}
              />
              <Button content="Add Reply" labelPosition="left" icon="edit" onClick={this.formSubmit} primary />
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
