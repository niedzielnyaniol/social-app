import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import forEach from 'lodash/forEach';

import { Grid, Image, Rail, Segment, Sticky, Header } from 'semantic-ui-react';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import TextArea from 'semantic-ui-react/dist/commonjs/addons/TextArea/TextArea';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Feed from 'semantic-ui-react/dist/commonjs/views/Feed/Feed';

import ProfileInfo from '../../../components/ProfileInfo';
import UserShape from '../../../shapes/user';
import UserPost from '../../../components/UserPost';
import SideCard from '../../../components/SideCard';

const StyledTextArea = styled(TextArea)`
  min-height: 175px;
  border-bottom-left-radius: 0!important;
  border-bottom-right-radius: 0!important;
`;

const Placeholder = () => <Image src="/assets/img/logo.png" />;

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: '',
    };

    this.handleContextRef = this.handleContextRef.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.proposedFriends = [];
  }

  componentWillReceiveProps(props) {
    if (props.pageData && props.pageData.propsedUsers) {
      this.proposedFriends = props.pageData.propsedUsers;
      this.requestLenght = props.pageData.invitationsLen;
      this.friendsLenght = props.pageData.friendsLen;
    }
  }

  onFormSubmit = () => {
    const data = {
      userId: this.props.user.id,
      content: this.state.postData,
    };

    axios.post('http://localhost:8000/api/createPost', data, {
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }

  onInputChange(data) {
    this.setState({ postData: data.value });
  }

  clearPost = () => {
    this.setState({ postData: '' });
  }

  handleContextRef(contextRef) {
    this.setState({ contextRef });
  }

  render() {
    const { contextRef } = this.state;
    return (
      <Grid centered>
        <Grid.Column width={7} style={{ paddingTop: 0 }}>
          <div ref={this.handleContextRef}>
            <Rail position="left" style={{ marginRight: 11 }}>
              <ProfileInfo user={this.props.user} />
              <Sticky context={contextRef} offset={73}>
                <Menu vertical style={{ width: '100%' }}>
                  <Menu.Item name="inbox" style={{ cursor: 'pointer' }} onClick={() => { window.location.href = '/invitations'; }}>
                    <Label color="teal">{this.requestLenght}</Label>
                    Invitations
                  </Menu.Item>

                  <Menu.Item name="spam" style={{ cursor: 'pointer' }} onClick={() => { window.location.href = '/friends'; }}>
                    <Label>{this.friendsLenght}</Label>
                    Friends
                  </Menu.Item>

                  <Menu.Item name="updates" onClick={this.handleItemClick}>
                    <Label>1</Label>
                    Updates
                  </Menu.Item>
                  <Menu.Item>
                    <Input icon="search" placeholder="Search mail..." />
                  </Menu.Item>
                </Menu>
              </Sticky>
            </Rail>
            <div>
              <Form onSubmit={this.onFormSubmit}>
                <StyledTextArea value={this.state.postData} placeholder="What's up?" onInput={(e, d) => this.onInputChange(d)} />
                <Button.Group attached="bottom">
                  <Button color="blue">Post</Button>
                  <Button.Or text="or" />
                  <Button onClick={this.clearPost}>Cancel</Button>
                </Button.Group>
              </Form>
              <Segment style={{ height: 2000 }}>
                <Feed>
                  {/* {
                    data.map((el, key) => (
                      <UserPost user={el.user} post={el.post} key={key} /> // eslint-disable-line
                    ))
                  } */}
                </Feed>
              </Segment>
            </div>
            <Rail position="right">
              <Sticky context={contextRef} offset={73}>
                <Placeholder />
                <Header as="h3">Users that You could know</Header>
                {
                  this.proposedFriends.map((el, key) => (
                    <SideCard user={el} key={key} /> // eslint-disable-line react/no-array-index-key
                  ))
                }
              </Sticky>
            </Rail>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

LoggedIn.propTypes = {
  user: UserShape.isRequired,
};

export default LoggedIn;
