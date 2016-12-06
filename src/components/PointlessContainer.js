import React from 'react'
import {reactiveComponent} from 'soup-js';
require('../styles/styles.css');


function PointlessContainer(props) {
  let {x} = props;
  return (
    <div className="pointless-container">
      I am subscribed to the superstream.
        Congratulations, you have had this wonderful app opened for {x}milliseconds!!!
      </div>
  )
}

export default reactiveComponent(PointlessContainer, 'timeState$');

