import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PointlessContainer from './PointlessContainer'
import AnotherPointlessContainer from './AnotherPointlessContainer.js'
import  * as GalleryActions from '../actions/actions.js';
import Perf from 'react-addons-perf' 
window.Perf = Perf;
require('../styles/styles.css');


export class Gallery extends Component {
  componentDidMount() {
    this.props.loadImages();
    this.time = 0;
    this.emptyComponents = [];
    for (let i = 0; i < 50; i ++) {
      this.emptyComponents.push(i);
    }
  }

  seizure() {
    const interval = setInterval(() => this.props.selectImage(this.props.images[Math.floor(Math.random() * 5)]), 50);
    setTimeout(() => clearInterval(interval), 10000)
  }
  
  timer() {
    const interval = setInterval(() => this.props.timeIncr(this.time += 50), 50);
  }

  render() {
    const {images, selectedImage, x, selectImage} = this.props;
    this.timer();
    return (
      <div className="image-gallery"  onClick={() => this.seizure()}>
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
  

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)
