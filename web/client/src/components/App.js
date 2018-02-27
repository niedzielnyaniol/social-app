import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium from 'radium';
import bind from 'lodash/bind';
import * as actions from '../actions';
import MessageList from './messages/MessageList';
import JoinForm from '../JoinForm';
import SendMessageForm from '../SendMessageForm';

const styles = {
  row: {
    margin: '0px',
    padding: '0px',
    display: 'flex',
    flexFlow: 'row nowrap',
  },
};

class App extends Component {
  constructor(props) {
    super(props);

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
      <div>
        <div style={styles.row}>
          <MessageList
            messages={messages}
          />
        </div>
        <div style={styles.row}>
          {form}
        </div>
      </div>
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
)(App));
