import "babel-polyfill"

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Gallery from './Gallery'
import PointlessContainer from './PointlessContainer'
import {Provider} from 'react-redux';

export default class App extends Component {
  render() {
    return (
      <div>
      <Gallery />
      </div>
    )
  }
}