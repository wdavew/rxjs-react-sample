import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

class Navbar extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default Navbar
