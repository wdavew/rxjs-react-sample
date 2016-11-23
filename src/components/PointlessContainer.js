import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  * as mouseActions from '../actions/mouseActions.js';
import Perf from 'react-addons-perf' 
window.Perf = Perf;
require('../styles/styles.css');


export default class PointlessContainer extends Component {
  render() {
    const {x} = this.props;
    return (
      <div className="pointless-container">
        I am subscribed to the redux store.
        Congratulations, you have had this wondefful app opened for {x} milliseconds!!!
      </div>
    )
  }
}

