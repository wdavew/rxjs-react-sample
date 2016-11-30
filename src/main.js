import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './components/Gallery'
import Timeline from './components/Timeline'
import StreamProvider from './StreamProvider';
import createUpstream from './superstream';
require("./styles/styles.css")

const store = createUpstream();

ReactDOM.render(
  <div>
  <StreamProvider upstream={store}>
  <Gallery />
  </StreamProvider>
  <Timeline upstream={store} />
  </div>,
  document.getElementById('root')
);
