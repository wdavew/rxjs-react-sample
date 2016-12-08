import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './components/Gallery'
import { createSuperstream, Timeline, StreamProvider, createStatestream } from 'soup-js'
import { imageReducer, timeReducer } from './reducer.js';
import { image$, time$ } from './actionStreams.js';
require("./styles/styles.css")

const superstream = createSuperstream();
const imageState$ = superstream.createStatestream(imageReducer, image$);
const timeState$ = superstream.createStatestream(timeReducer, time$);
const streamCollection = { imageState$, timeState$ };

superstream.createStore(streamCollection);

ReactDOM.render(
  <div>
    <StreamProvider superstream={superstream}>
      <Gallery />
      <Timeline />
    </StreamProvider> 
  </div>,
  document.getElementById('root')
);
