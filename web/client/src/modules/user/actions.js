import { createAction } from 'redux-actions';
// action       type
// request*     REQUEST_*
// receive*     RECEIVE_*

export const REQUEST_GET_USER = 'REQUEST_GET_USER';
export const RECEIVE_GET_USER = 'RECEIVE_GET_USER';
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT';
export const REQUEST_AUTH = 'REQUEST_AUTH';
export const RECEIVE_AUTH = 'RECEIVE_AUTH';
export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';

export const requestGetUser = createAction(REQUEST_GET_USER);
export const receiveUser = createAction(RECEIVE_GET_USER);
export const requestSignup = createAction(REQUEST_SIGNUP);
export const requestLogin = createAction(REQUEST_LOGIN);
export const requestAuth = createAction(REQUEST_AUTH);
export const requestLogout = createAction(REQUEST_LOGOUT);
export const receiveLogout = createAction(RECEIVE_LOGOUT);
export const receiveAuth = createAction(RECEIVE_AUTH);
export const requestSearch = createAction(REQUEST_SEARCH);
export const receiveSearch = createAction(RECEIVE_SEARCH);
