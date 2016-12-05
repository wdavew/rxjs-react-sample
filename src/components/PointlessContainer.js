import React from 'react'
import {reactiveComponent} from 'soup-js';
require('../styles/styles.css');


function PointlessContainer(props) {
  let {TIME_INCR: x} = props;
  x *= 10;
  return (
    <div className="pointless-container">
      I am subscribed to the superstream.
        Congratulations, you have had this wonderful app opened for {x}milliseconds!!!
      </div>
  )
}

export default reactiveComponent(PointlessContainer, 'TIME_INCR');

