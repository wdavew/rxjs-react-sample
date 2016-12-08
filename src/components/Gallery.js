import React, { Component } from 'react'
import { reactiveComponent } from 'soup-js';
import PointlessContainer from './PointlessContainer'
import AnotherPointlessContainer from './AnotherPointlessContainer.js'
import Perf from 'react-addons-perf'
import Rx from 'rxjs/Rx';
window.Perf = Perf;
require('../styles/styles.css');
import { selectImage, fetchImages, fetchGalaxy, timeIncr, cancelRequest } from '../action.js';

class Gallery extends Component {
  constructor(props, context) {
    super(props, context);
    this.time = 0;
    this.emptyComponents = [];
    for (let i = 0; i < 3; i++) {
      this.emptyComponents.push(i);
    }
  }

  componentDidMount() {
    this.props.dispatchObservableFn(fetchImages);
  }

  performanceTest() {
    setTimeout(() => {
      clearInterval(timerInterval);
      Perf.stop();
      Perf.printInclusive();
      Perf.printExclusive();
      Perf.printWasted();
    }, 3000)
    Perf.start();
    const timerInterval = this.timer();
  }

  timer() {
    return setInterval(() => this.props.dispatch(timeIncr(), 50));
  }

  render() {
    const {images, selectedImage, galaxy, dispatch} = this.props;
    return (
      <div>
        <div className="image-gallery">
          <button onClick={() => dispatch(fetchGalaxy())}>Fetch a Galaxy!</button>
          <button onClick={() => dispatch(cancelRequest())}>I changed my mind and no longer want a Galaxy</button>
          <button onClick={() => this.performanceTest()}>Click Me</button>
          <PointlessContainer />
          <div className="gallery-image">
            <div>
              <img src={selectedImage} />
            </div>
          </div>
          <div className="image-scroller">
            {images ? images.map((image, index) => (
              <div key={index} onClick={() => dispatch(selectImage(image))}>
                <img src={image} />
              </div>
            )) : undefined}
          </div>
          {this.emptyComponents ?
            this.emptyComponents.map((comp, index) => {
              return <AnotherPointlessContainer image={selectedImage} key={index} />
            })
            : undefined
          }
        </div>
        <img src={galaxy} />
      </div>
    )
  }
}

export default reactiveComponent(Gallery, 'imageState$');