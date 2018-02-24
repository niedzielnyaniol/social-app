import React from 'react';
import styled from 'styled-components';

import { Grid, Image, Rail, Segment, Sticky } from 'semantic-ui-react';
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

const StyledTextArea = styled(TextArea)`
  min-height: 175px;
  border-bottom-left-radius: 0!important;
  border-bottom-right-radius: 0!important;
`;

const Placeholder = () => <Image src="/assets/img/logo.png" />;

const data = [
  {
    user: {
      name: 'John Doe',
      avatar: <Placeholder />,
    },
    post: {
      likes: 3,
      text: 'You are using the default filter for the users service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering',
      date: 1,
    },
  },
  {
    user: {
      name: 'Mr Noone',
      avatar: <Placeholder />,
    },
    post: {
      likes: 21,
      text: 'In Informatics, dummy data is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present.',
      date: 1,
    },
  },
  {
    user: {
      name: 'Piotr Nowak',
      avatar: <Placeholder />,
    },
    post: {
      likes: 15,
      text: 'A free test data generator and API mocking tool - Mockaroo lets you create custom CSV, JSON, SQL, and Excel datasets to test and demo your software.',
      date: 2,
    },
  },
  {
    user: {
      name: 'Aleksander Wójcik',
      avatar: <Placeholder />,
    },
    post: {
      likes: 15,
      text: 'WooCommerce Dummy Data. Right after installing WooCommerce you may find you have an empty store. There are no products, orders, reviews, and more by default. We\'ve done that so you can get started right away creating your own products and setting up WooCommerce exactly for the needs of your store.',
      date: 3,
    },
  },
];

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleContextRef = this.handleContextRef.bind(this);
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
                  <Menu.Item name="inbox" onClick={this.handleItemClick}>
                    <Label color="teal">1</Label>
                    Inbox
                  </Menu.Item>

                  <Menu.Item name="spam" onClick={this.handleItemClick}>
                    <Label>51</Label>
                    Spam
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
              <Form>
                <StyledTextArea placeholder="What's up?" />
                <Button.Group attached="bottom">
                  <Button color="blue">Post</Button>
                  <Button.Or text="or" />
                  <Button>Cancel</Button>
                </Button.Group>
              </Form>
              <Segment style={{ height: 2000 }}>
                <Feed>
                  {
                    data.map((el, key) => (
                      <UserPost user={el.user} post={el.post} key={key} /> // eslint-disable-line
                    ))
                  }
                </Feed>
              </Segment>
            </div>
            <Rail position="right">
              <Sticky context={contextRef} offset={73}>
                <Placeholder />
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
