import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import reactiveComponent from '../reactive-component';
import PointlessContainer from './PointlessContainer'
import AnotherPointlessContainer from './AnotherPointlessContainer.js'
import * as GalleryActions from '../actions/actions.js';
import Perf from 'react-addons-perf'
window.Perf = Perf;
require('../styles/styles.css');

const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;

const fetchImages = (dispatch) => {
  return fetch(API_ENDPOINT).then(function (response) {
    return response.json().then(function (json) {
      return json.photos.photo.map(
        ({farm, server, id, secret}) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      )
      }).then(imgList => {
        dispatch({ data: imgList, type: 'IMAGE_LIST' });
        dispatch({ data: imgList[0], type: 'SELECT_IMAGE' });
    })
  })
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
    this.fetchImages = fetchImages.bind(this, props.dispatch);
    this.selectImage = selectImage.bind(this, props.dispatch);
    this.timeIncr = timeIncr.bind(this, props.dispatch);
  }

  componentDidMount() {
    this.fetchImages();
    this.time = 0;
    this.emptyComponents = [];
    for (let i = 0; i < 5000; i++) {
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
    }, 10000)
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
    const {IMAGE_LIST: images, SELECT_IMAGE: selectedImage} = this.props;
    return (
      <div className="image-gallery">
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
    )
  }
}

export default reactiveComponent(Gallery, 'IMAGE_LIST', 'SELECT_IMAGE');