import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
require('../styles/styles.css')
// STORE
const Rx = require('rxjs/Rx');

const flickrImages = [
  "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg",
  "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
  "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg",
  "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg",
  "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
];


const source = new Rx.Subject();
const setImages = (images) => {
  console.log('setting images');
  source.next(images);
}

// function Gallery() {
//   return source.last();
// } 

const sub = source.subscribe(images => {
  console.log(images);
  ReactDOM.render(
    <div className="image-gallery">
      <div className="gallery-image">
        <div>
          Selected Image goes here
          </div>
      </div>
      <div className="image-scroller">
        {images.map((image, index) => (
          <div key={index}>
              <img src={image} />
      </div>
        ))}
      </div>
      </div >,
    document.getElementById('root')
    )
})

setImages(flickrImages)

const interval = setInterval(() => setImages(flickrImages.slice(0, Math.floor(Math.random() * 5))), 5)
setTimeout(() => clearInterval(interval), 3000);