import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fork, all } from 'redux-saga/effects';

import { currentUser, currentUserIsTyping } from './reducers/currentUser';
import { users, userIdsTyping } from './reducers/users';
import { messages } from './reducers/messages';

import { user, pageData } from './user/reducers';
import * as userSagas from './user/sagas';

export const rootReducer = combineReducers({
  user,
  pageData,
  router: routerReducer,
  messages,
  users,
  userIdsTyping,
  currentUser,
  currentUserIsTyping,
});

export function* rootSaga() {
  yield all([
    ...Object.values(userSagas),
  ].map(fork));
}
