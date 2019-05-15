import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reduces from './reducers';
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// redux中间件
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reduces, enhancer);

sagaMiddleware.run(rootSaga);

window.store = store;

export default store;
