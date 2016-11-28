import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './components/Gallery'
import StreamProvider from './StreamProvider';
import createUpstream from './superstream';
require("./styles/styles.css")

const store = createUpstream();

ReactDOM.render(
  <StreamProvider upstream={store}>
  <Gallery />
  </StreamProvider>,
  document.getElementById('root')
);