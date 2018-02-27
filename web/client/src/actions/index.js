import * as config from '../modules/reducers/config';
import * as actionTypes from '../actions/actionTypes';

const { messageTypes } = config;

export function startUp() {
  // this is the redux-middleware package in action, dispatch and getState params are passed in
  return (dispatch, getState, { emit }) => {
    emit(messageTypes.usersRequested);
  };
}

export function join(name) {
  return (dispatch, getState, { emit }) => {
    emit(messageTypes.joinRequested, { name });
  };
}

export function sendMessage(message) {
  return (dispatch, getState, { emit }) => {

    const typing1 = getState().currentUserIsTyping;

    // if we're sending a message we're probably not also typing :)
    if (typing1) {
      dispatch({ type: actionTypes.typingStopped });
      emit(messageTypes.userStoppedTyping);
    }

    dispatch({ type: actionTypes.messageSendRequested });
    emit(messageTypes.messageAdded, { message });
  };
}

export function typing() {
  const typingTimerLength = 400;

  return (dispatch, getState, { emit }) => {
    console.log(getState());
    const typing1 = getState().currentUserIsTyping;
    // don't spam "typing" events and websocket messages
    if (!typing1) {
      dispatch({ type: actionTypes.typingStarted });
      emit(messageTypes.userStartedTyping);
    }

    const lastTypingTime = Date.now();

    setTimeout(() => {
      const typing12 = getState().currentUserIsTyping;
      const timeDiff = Date.now() - lastTypingTime;

      if (timeDiff >= typingTimerLength && typing12) {
        dispatch({ type: actionTypes.typingStopped });
        emit(messageTypes.userStoppedTyping);
      }
    }, typingTimerLength);
  };
}
