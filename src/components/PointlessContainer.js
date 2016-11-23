import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  * as mouseActions from '../actions/mouseActions.js';
import Perf from 'react-addons-perf' 
window.Perf = Perf;
require('../styles/styles.css');

export class PointlessContainer extends Component {
  render() {
    const {x, y} = this.props;
    return (
      <div className="pointless-container">
        I am subscribed to the redux store.
        In case you didn't know, your mouse is at ({x}, {y}));
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {x, y} = state;
  return {x, y};
}

export default connect(mapStateToProps)(PointlessContainer)
