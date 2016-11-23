import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import {Provider} from 'react-redux';
require("./styles/styles.css")
import {watchForLoadImages} from './watchForLoadImages'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchForLoadImages);

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);