import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  * as GalleryActions from '../actions/actions.js';
import Perf from 'react-addons-perf' 
window.Perf = Perf;
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
  }
  render() {
    const {images, selectedImage, selectImage, mouseMove} = this.props;
    return (
      <div className="image-gallery"  onMouseMove={(e) => mouseMove(e.pageX, e.pageY)}>
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
      </div>
    )
  }
  }
  
function mapStateToProps(state) {
  return {
    images: state.images,
    selectedImage: state.selectedImage
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(GalleryActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)
