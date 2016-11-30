import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './components/Gallery'
import soop from 'soop';
require("./styles/styles.css")

const store = soop.createUpstream();
const Timeline = soop.Timeline;
const StreamProvider = soop.StreamProvider;

ReactDOM.render(
  <div>
    <StreamProvider upstream={store}>
      <Gallery />
    </StreamProvider>
    <Timeline upstream={store} />
  </div>,
  document.getElementById('root')
);
