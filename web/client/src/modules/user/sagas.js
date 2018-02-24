import { takeEvery, call, put } from 'redux-saga/effects';

import { search, getUser } from './api';
import {
  receiveSearch,
  receiveUser,
  REQUEST_SEARCH,
  REQUEST_GET_USER,
} from './actions';

function* callSearch({ payload: { data, redirect } }) {
  const users = yield call(search, data);
  yield put(receiveSearch(users.data));
  redirect();
}

export function* searchSaga() {
  yield takeEvery(REQUEST_SEARCH, callSearch);
}

function* callGetUser({ payload: { email } }) {
  const user = yield call(getUser, email);
  console.log(user);
  yield put(receiveUser(user.data));
}

export function* getUserSaga() {
  yield takeEvery(REQUEST_GET_USER, callGetUser);
}
