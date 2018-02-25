import { handleAction } from 'redux-actions';
import { receiveUser, receiveGetPageData } from './actions';

export const user = handleAction(receiveUser, {
  next(state, action) {
    return action.payload;
  },
}, {});

export const pageData = handleAction(receiveGetPageData, {
  next(state, action) {
    return action.payload;
  },
}, {});
