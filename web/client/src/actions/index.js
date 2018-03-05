import * as config from '../modules/reducers/config';
import * as actionTypes from '../actions/actionTypes';

const { messageTypes } = config;

export function startUp() {
  // redux-middleware przekazujące metody dispatch, getState, oraz emit-wysyłająca zdarzenie wraz z wiadomością
  return (dispatch, getState, { emit }) => {
    emit(messageTypes.usersRequested);
  };
}
// dołączenie do czatu
export function join(name) {
  return (dispatch, getState, { emit }) => {
    emit(messageTypes.joinRequested, { name });
  };
}
// wysłanie wiadomości
export function sendMessage(message) {
  return (dispatch, getState, { emit }) => {

    const typing1 = getState().currentUserIsTyping;

    // jeśli wysyłamy wiadomość zazwyczaj jesteśmy jeszcze w trakcie pisania
    if (typing1) {
      dispatch({ type: actionTypes.typingStopped });
      emit(messageTypes.userStoppedTyping);
    }

    dispatch({ type: actionTypes.messageSendRequested });
    emit(messageTypes.messageAdded, { message });
  };
}
// pisanie wiadomości
export function typing() {
  const typingTimerLength = 400;

  return (dispatch, getState, { emit }) => {
    console.log(getState());
    const typing1 = getState().currentUserIsTyping;
    // w celu zapobiegnięcia wysyłania zdarzeń "w trakcie pisania" zbyt często
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
