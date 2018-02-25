import React from 'react';

import { Feed, Icon } from 'semantic-ui-react';

import UserShape from '../shapes/user';
import PostShape from '../shapes/post';

const UserPost = ({ user, post }) => (
  <Feed.Event style={{ borderBottom: '1px solid #dededf' }}>
    <Feed.Label image={user.avatar} />
    <Feed.Content>
      <Feed.Summary>
        <a href={`/users/${user.id}`}>{user.name}</a> posted on his page
        <Feed.Date>{post.date} days ago</Feed.Date>
      </Feed.Summary>
      <Feed.Extra text>
        {post.text}
      </Feed.Extra>
      <Feed.Meta>
        <Feed.Like>
          <Icon name="like" />
          {post.likes} Likes
        </Feed.Like>
      </Feed.Meta>
    </Feed.Content>
  </Feed.Event>
);

UserPost.propTypes = {
  post: PostShape.isRequired,
  user: UserShape.isRequired,
};

export default UserPost;
