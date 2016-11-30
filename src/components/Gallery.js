import React, { Component } from 'react'
import {reactiveComponent} from 'soop';
import PointlessContainer from './PointlessContainer'
import AnotherPointlessContainer from './AnotherPointlessContainer.js'
import Perf from 'react-addons-perf'
import Rx from 'rxjs/Rx';
window.Perf = Perf;
require('../styles/styles.css');

const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;


const fetchImages = (upstream) => {
  // upstream.filter(action => action.type === 'REQUEST_ABORT').last(data => console.log("upstream filtered", data));
  return Rx.Observable.fromPromise(
    fetch(API_ENDPOINT).then((response) => response.json())
      .then((json) => json.photos.photo.map(
        ({farm, server, id, secret}) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      ))
  ).flatMap((urlArray) => {
    return Rx.Observable.from([{ data: urlArray, type: 'IMAGE_LIST' }, { data: urlArray[0], type: 'SELECT_IMAGE' }])
  })
    .startWith({ data: null, type: 'REQUEST_IMAGES' }) // maybe add this part to superstream instead
    .takeUntil(upstream.filter(action => action.type === 'REQUEST_ABORT'))
}

const fetchGalaxy = (upstream) => {
  const init = {
    method: 'GET',
    mode: 'cors'
  }
  return Rx.Observable.fromPromise(
    (fetch('https://upload.wikimedia.org/wikipedia/commons/2/2b/Tolworth_tower_gigapixel_panorama.jpg', init)
    ).then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
    )
    .flatMap((responseString) => {
      return Rx.Observable.of({ data: responseString, type: 'GALAXY_HAS_ARRIVED' }).delay(3000)
    })
    .startWith({ data: null, type: 'REQUEST_GALAXY' }) // maybe add this part to superstream instead
    .takeUntil(upstream.filter(action => action.type === 'REQUEST_ABORT'))
}

const selectImage = (dispatch, imageUrl) => {
  dispatch({ data: imageUrl, type: 'SELECT_IMAGE' });
}

const timeIncr = (dispatch, time) => {
  dispatch({ data: time, type: 'TIME_INCR' })
}

class Gallery extends Component {
  constructor(props) {
    super();
    this.fetchImages = fetchImages.bind(this);
    this.fetchGalaxy = () => this.props.dispatchSideEffect(fetchGalaxy);
    this.cancelRequest = () => this.props.dispatch({data: null, type: 'REQUEST_ABORT'});
    this.selectImage = selectImage.bind(this, props.dispatch);
    this.timeIncr = timeIncr.bind(this, props.dispatch);
  }

  componentDidMount() {
    this.props.dispatchSideEffect(this.fetchImages);
    this.time = 0;
    this.emptyComponents = [];
    for (let i = 0; i < 3; i++) {
      this.emptyComponents.push(i);
    }
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

  seizure() {
    return setInterval(() => this.selectImage(this.props.IMAGE_LIST[Math.floor(Math.random() * 5)]), 1000);
  }

  timer() {
    return setInterval(() => this.timeIncr(this.time += 50), 50);
  }

  render() {
    const {IMAGE_LIST: images, SELECT_IMAGE: selectedImage, GALAXY_HAS_ARRIVED: galaxy} = this.props;
    return (
      <div>
        <div className="image-gallery">
          <button onClick={this.fetchGalaxy}>Fetch a Galaxy!</button>
          <button onClick={this.cancelRequest}>I changed my mind and no longer want a Galaxy</button>
          <button onClick={() => this.performanceTest()}>Click Me</button>
          <PointlessContainer />
          <div className="gallery-image">
            <div>
              <img src={selectedImage} />
            </div>
          </div>
          <div className="image-scroller">
            {images ? images.map((image, index) => (
              <div key={index} onClick={() => this.selectImage(image)}>
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

export default reactiveComponent(Gallery, 'IMAGE_LIST', 'SELECT_IMAGE', 'GALAXY_HAS_ARRIVED');