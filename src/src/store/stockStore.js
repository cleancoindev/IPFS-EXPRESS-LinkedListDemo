import { createStore, applyMiddleware } from 'redux';
import stockReducer from '../reducers/stockReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  stockReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;
