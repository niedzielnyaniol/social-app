import { createAction } from 'redux-actions';
// action       type
// request*     REQUEST_*
// receive*     RECEIVE_*

export const REQUEST_GET_USER = 'REQUEST_GET_USER';
export const RECEIVE_GET_USER = 'RECEIVE_GET_USER';
export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';

export const requestGetUser = createAction(REQUEST_GET_USER);
export const receiveUser = createAction(RECEIVE_GET_USER);
export const requestSearch = createAction(REQUEST_SEARCH);
export const receiveSearch = createAction(RECEIVE_SEARCH);
