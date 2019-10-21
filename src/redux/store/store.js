import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  thunk,
  sagaMiddleware,
];

const enhancers = [
  applyMiddleware(...middlewares), // empty for now;
];

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(...enhancers)
);

sagaMiddleware.run(sagas);

export default store