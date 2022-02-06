import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import main from './modules/main';
import chat from './modules/chat';
import user from './modules/user';
import profile from './modules/profile';
import preview from './modules/preview';
import post from './modules/post';
import matching from './modules/matching';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  matching: matching,
  post: post,
  preview: preview,
  profile: profile,
  main: main,
  chat: chat,
  user: user,
  router: connectRouter(history),
});

//부속
const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = initialStore => createStore(rootReducer, enhancer);

export default store();
