import React from 'react'
import reactiveComponent from '../reactive-component';
require('../styles/styles.css');


function PointlessContainer(props) {
  const {TIME_INCR: x} = props;
  return (
    <div className="pointless-container">
      I am subscribed to the redux store.
        Congratulations, you have had this wondefful app opened for {x}milliseconds!!!
      </div>
  )
}

export default reactiveComponent(PointlessContainer, 'TIME_INCR');

