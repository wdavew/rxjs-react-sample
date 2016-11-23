import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
require('../styles/styles.css');

const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;


// STORE
const Rx = require('rxjs/Rx');

const superstream = new Rx.Subject();

const fetchImgs = () => {
  return fetch(API_ENDPOINT).then(function (response) {
    return response.json().then(function (json) {
      const imageList = json.photos.photo.map(
        ({farm, server, id, secret}) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      )
      dispatch(imageList);
      dispatch(imageList[0]);
    });
  });
}

const dispatch = (data) => {
  console.log('sending data', data);
  superstream.next(data);
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
          <div onClick={() => dispatch(image)} key={index}>
            <img src={image} />
          </div>
        ))}
      </div>
    </div >
  )
});

superstream.subscribe((ele) => console.log('superstream', ele));
renderStream.subscribe(app => ReactDOM.render(app, document.getElementById('root')));
fetchImgs()

