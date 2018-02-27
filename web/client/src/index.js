import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { List, Map } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// import store from './store';
import Routes from './routes';
// import App from './App';
import { rootReducer, rootSaga } from './modules';
import { init as websocketInit, emit } from './actions/websocket';

const initialState = new Map()
  .set('messages', new List())
  .set('users', new List())
  .set('userIdsTyping', new Map())
  .set('currentUser', new Map())
  .set('currentUserIsTyping', false);

function startUp() {
  const middleware = [thunkMiddleware.withExtraArgument({ emit })];
  const sagaMiddleware = createSagaMiddleware();
  // use the logger in development mode - this is set in webpack.config.dev.js
  // if (__DEV__) {
  middleware.push(createLogger());
  middleware.push(sagaMiddleware);
  // }

  const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
  sagaMiddleware.run(rootSaga);
  websocketInit(store); // setup websocket listeners etc

  return store;
}

const app = (
  <Provider store={startUp()}>
    <Routes />
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root'),
);
