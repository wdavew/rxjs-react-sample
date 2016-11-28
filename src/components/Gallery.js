import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PointlessContainer from './PointlessContainer'
import AnotherPointlessContainer from './AnotherPointlessContainer.js'
import  * as GalleryActions from '../actions/actions.js';
import Perf from 'react-addons-perf' 
require('../styles/styles.css');


const flickrImages = [
  "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
  "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg",
  "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg",
  "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
];

export class Gallery extends Component {
  componentDidMount() {
    this.props.loadImages();
    this.time = 0;
    this.emptyComponents = [];
    for (let i = 0; i < 5000; i ++) {
      this.emptyComponents.push(i);
    }
  }

  performanceTest() {
    setTimeout(() => {
      // clearInterval(seizureInterval);
      clearInterval(timerInterval);
      Perf.stop();
      Perf.printInclusive();
      Perf.printExclusive();
      Perf.printWasted();
    }, 10000)
    Perf.start();
    // const seizureInterval = this.seizure();
    const timerInterval = this.timer();
  }

  seizure() {
    return setInterval(() => this.props.selectImage(this.props.images[Math.floor(Math.random() * 5)]), 50);

  }
  
  timer() {
    return setInterval(() => this.props.timeIncr(this.time += 50), 50);
  }

  render() {
    const {images, selectedImage, x, selectImage} = this.props;
    return (
      <div className="image-gallery">
      <button onClick={() => this.performanceTest()}>Click me</button>
      <PointlessContainer x={x} />
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
           <div key={index} onClick={() => selectImage(image)}>
              <img src={image} />
            </div>
          ))}
        </div>
        {this.emptyComponents ? 
          this.emptyComponents.map((comp, index) => {
          return <AnotherPointlessContainer image={selectedImage} key={index}/>
          })
        : undefined
        }
      </div>
    )
  }
  }
  
function mapStateToProps(state) {
  return {
    images: state.images,
    selectedImage: state.selectedImage,
    x: state.x,
    y: state.y,
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(GalleryActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)
