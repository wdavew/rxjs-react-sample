import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
require('../styles/styles.css');

const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;


// STORE
const Rx = require('rxjs/Rx');

const source = new Rx.Subject();
const selectedImg = new Rx.Subject();
const makeAJAX = new Rx.Subject();
const superstream = source.merge(selectedImg, makeAJAX);

const fetchImgs = () => {
  return fetch(API_ENDPOINT).then(function (response) {
    return response.json().then(function (json) {
      const imageList = json.photos.photo.map(
        ({farm, server, id, secret}) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      )
      makeAJAX.next(imageList);
      selectImg(imageList[0]);
    });
  });
}

const selectImg = (img) => {
  console.log('selecting img', img);
  selectedImg.next(img);
}

const setImages = (images) => {
  console.log('setting images');
  source.next(images);
}

// function Gallery() {
//   return source.last();
// } 

const filteredMakeAJAX = superstream.filter((el) => {
  return Array.isArray(el);
});

const filteredSelectedImg = superstream.filter((el) => {
  return typeof el === 'string';
});

const renderStream = Rx.Observable.combineLatest(filteredMakeAJAX, filteredSelectedImg, (imgList, selectedImg) => {
  console.log('stateStream: ', imgList, selectedImg);
  return (
    <div className="image-gallery">
      <div className="gallery-image">
        <div>
          <img src={selectedImg} />
        </div>
      </div>
      <div className="image-scroller">
        {imgList.map((image, index) => (
          <div onClick={() => selectImg(image)} key={index}>
            <img src={image} />
          </div>
        ))}
      </div>
    </div >
  )
});

const interval = setInterval(() => {
  fetchImgs()
}, 1000)

superstream.subscribe((ele) => console.log('superstream', ele));
renderStream.subscribe(app => ReactDOM.render(app, document.getElementById('root')));

setTimeout(() => clearInterval(interval), 3000);