import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fork, all } from 'redux-saga/effects';

import { user, pageData } from './user/reducers';
import * as userSagas from './user/sagas';

export const rootReducer = combineReducers({
  user,
  pageData,
  router: routerReducer,
});

export function* rootSaga() {
  yield all([
    ...Object.values(userSagas),
  ].map(fork));
}
