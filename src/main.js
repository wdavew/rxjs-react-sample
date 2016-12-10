import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import soup from 'soup-js';

import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Navbar from './components/Navbar'

require("./styles/styles.css")
const store = soup.createSuperstream();

const Timeline = soup.Timeline;
const StreamProvider = soup.StreamProvider;

ReactDOM.render(
  <div>
    <StreamProvider superstream={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Navbar}>
          <Route path="/gallery" component={Gallery} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Route>
      </Router>
    </StreamProvider>
    <Timeline superstream={store} />
  </div>,
  document.getElementById('root')
);
