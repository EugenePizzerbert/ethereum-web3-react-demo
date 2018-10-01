import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  /* eslint-disable no-underscore-dangle */
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
}

export default () => {
  return createStore(
    combineReducers({
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );
};
