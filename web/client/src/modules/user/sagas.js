import { takeEvery, call, put } from 'redux-saga/effects';

import { logout, signup, login, auth, search, getUser } from './api';
import {
  receiveAuth,
  receiveLogout,
  receiveSearch,
  requestAuth,
  receiveUser,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_SIGNUP,
  REQUEST_AUTH,
  REQUEST_SEARCH,
  REQUEST_GET_USER,
} from './actions';


function* callLogin({ payload: { data, redirect } }) {
  yield call(login, data);
  yield put(requestAuth());
  redirect();
}

export function* loginSaga() {
  yield takeEvery(REQUEST_LOGIN, callLogin);
}

function* callSignup({ payload: { redirect, data } }) {
  yield call(signup, data);
  redirect();
}

export function* signupSaga() {
  yield takeEvery(REQUEST_SIGNUP, callSignup);
}

function* callLogout() {
  yield call(logout);
  yield put(receiveLogout({}));
}

export function* logoutSaga() {
  yield takeEvery(REQUEST_LOGOUT, callLogout);
}

function* callAuth({ payload }) {
  const user = yield call(auth);
  yield put(receiveAuth(user));
  if (!Object.values(user).length) {
    payload();
  }
}

export function* authSaga() {
  yield takeEvery(REQUEST_AUTH, callAuth);
}

function* callSearch({ payload: { data, redirect } }) {
  const users = yield call(search, data);
  yield put(receiveSearch(users.data));
  redirect();
}

export function* searchSaga() {
  yield takeEvery(REQUEST_SEARCH, callSearch);
}

function* callGetUser({ payload: { id, redirect } }) {
  const user = yield call(getUser, id);
  yield put(receiveUser(user.data));
  redirect();
}

export function* getUserSaga() {
  yield takeEvery(REQUEST_GET_USER, callGetUser);
}
