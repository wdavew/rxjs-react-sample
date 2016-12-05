import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './components/Gallery'
import { createSuperstream, Timeline, StreamProvider } from 'soup-js'
require("./styles/styles.css")

const store = createSuperstream();

ReactDOM.render(
  <div>
    <StreamProvider superstream={store}>
      <Gallery />
    </StreamProvider>
    <Timeline superstream={store} />
  </div>,
  document.getElementById('root')
);
