import { handleAction, combineActions } from 'redux-actions';
import {
  receiveAuth,
  receiveLogout,
  receiveSearch,
} from './actions';

// eslint-disable-next-line
export const user = handleAction(combineActions(receiveAuth, receiveLogout), {
  next(state, action) {
    return action.payload;
  },
}, {});

export const foundUsers = handleAction(receiveSearch, {
  next(state, { payload }) {
    return payload;
  },
}, []);
