import { createAction } from 'redux-actions';
// action       type
// request*     REQUEST_*
// receive*     RECEIVE_*

export const REQUEST_GET_USER = 'REQUEST_GET_USER';
export const RECEIVE_GET_USER = 'RECEIVE_GET_USER';
export const REQUEST_PAGE_DATA = 'REQUEST_PAGE_DATA';
export const RECEIVE_PAGE_DATA = 'RECEIVE_PAGE_DATA';

export const requestGetUser = createAction(REQUEST_GET_USER);
export const receiveUser = createAction(RECEIVE_GET_USER);
export const requestGetPageData = createAction(REQUEST_PAGE_DATA);
export const receiveGetPageData = createAction(RECEIVE_PAGE_DATA);
