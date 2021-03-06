import React, { Component } from 'react';
import styled from 'styled-components';
import App from './App';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium from 'radium';
import bind from 'lodash/bind';
import * as actions from '../actions';
import MessageList from './messages/MessageList';
import JoinForm from '../JoinForm';
import SendMessageForm from '../SendMessageForm';

const Container = styled.div`
  width: 270px;
  position: fixed;
  bottom: 0;
  background: #fefefe;
  right: 240px;
`;

const Content = styled.div`
  border: 1px solid rgba(34,36,38,.1);
  border-top: none;
  border-bottom: none;
`;

const Header = styled.div`
  font-size: 14px;
  font-weight: 600;
  background: #2185D0;
  padding: 5px 10px;
  color: #fff;
  min-height: 29px;
`;

const BtnX = styled.div`
  float: right;
  cursor: pointer;
`;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      hidden: false,
    };

    this.join = bind(this.join, this);
    this.sendMessage = bind(this.sendMessage, this);
    this.typing = bind(this.typing, this);
  }

  componentWillMount() {
    this.props.actions.startUp();
  }

  join(name) {
    this.props.actions.join(name);
  }

  sendMessage(message) {
    this.props.actions.sendMessage(message);
  }

  typing() {
    this.props.actions.typing();
  }

  hide = () => {
    this.setState({ hidden: !this.state.hidden });
  }

  close = () => {
    this.setState({ visible: false });
  }

  renderForm() {
    const { currentUser } = this.props;

    if (currentUser.size === 0) {
      return (
        <JoinForm
          join={this.join}
        />
      );
    }

    return (
      <SendMessageForm
        typing={this.typing}
        sendMessage={this.sendMessage}
      />
    );
  }

  render() {
    const { messages, users, userIdsTyping } = this.props;
    const form = this.renderForm();

    return (
      this.state.visible ?
        <Container>
          <Header onClick={this.hide}>Chat<BtnX onClick={this.close}>&#10006;</BtnX></Header>
          {
            this.state.hidden ? null : [
              <Content >
                <MessageList
                  messages={messages}
                />
                {form}
              </Content>,
            ]
          }
        </Container> : null
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    users: state.users,
    currentUser: state.currentUser,
    userIdsTyping: state.userIdsTyping,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: bindActionCreators(actions, dispatch),
  };
}

export default Radium(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat));
// export default Chat;
