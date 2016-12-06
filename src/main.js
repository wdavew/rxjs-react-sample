import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './components/Gallery'
import { createSuperstream, Timeline, StreamProvider, createStatestream } from 'soup-js'
import reducer from './reducer.js';
import image$ from './actionStreams.js';
require("./styles/styles.css")

const superstream = createSuperstream();
const imageState$ = superstream.createStatestream(reducer, image$);
const streamCollection = { imageState$ };

superstream.createStore(streamCollection);
imageState$.subscribe(x => console.log('state stream is', x));

ReactDOM.render(
  <div>
    <StreamProvider superstream={superstream}>
      <Gallery />
    </StreamProvider>
    <Timeline superstream={superstream} />
  </div>,
  document.getElementById('root')
);
