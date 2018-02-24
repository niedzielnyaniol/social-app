import { handleAction } from 'redux-actions';
import { receiveUser } from './actions';

// eslint-disable-next-line
export const user = handleAction(receiveUser, {
  next(state, action) {
    return action.payload;
  },
}, {});
