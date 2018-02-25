import { takeEvery, call, put } from 'redux-saga/effects';

import { getPageData as pageData, getUser } from './api';
import {
  receiveGetPageData,
  receiveUser,
  REQUEST_PAGE_DATA,
  REQUEST_GET_USER,
} from './actions';

function* callGetPageData() {
  const data = yield call(pageData);
  yield put(receiveGetPageData(data.data));
}

export function* getPageData() {
  yield takeEvery(REQUEST_PAGE_DATA, callGetPageData);
}

function* callGetUser({ payload: { email } }) {
  const user = yield call(getUser, email);
  yield put(receiveUser(user.data));
}

export function* getUserSaga() {
  yield takeEvery(REQUEST_GET_USER, callGetUser);
}
