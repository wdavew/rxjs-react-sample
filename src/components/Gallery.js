import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Perf from 'react-addons-perf';
import reactiveComponent from '../reactive-component.js';
import createUpstream from '../streams/superstream.js';
import StreamProvider from '../StreamProvider.js';
const upstream = createUpstream();
const dispatch = upstream.dispatch.bind(upstream);

window.dispatch = dispatch;
window.Perf = Perf;
require('../styles/styles.css');

const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;

const fetchImgs = () => {
  return fetch(API_ENDPOINT).then(function (response) {
    return response.json().then(function (json) {
      const imgList = json.photos.photo.map(
        ({farm, server, id, secret}) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      )
      dispatch({data: imgList, type: 'IMAGE_LIST'});
      dispatch({data: imgList[0], type: 'SELECT_IMAGE'});
    });
  });
}

const SelectedImg = reactiveComponent((selectedImg) => {
  return (<div className='selected-text'>{selectedImg}</div>)
}, 'SELECT_IMAGE');


const elementDefinition = (imgList, selectedImg) => {
  return (
    <div className="image-gallery">
      <div className="gallery-image">
        <div>
        <SelectedImg />
          <img src={selectedImg} />
        </div>
      </div>
      <div className="image-scroller">
        {imgList.map((image, index) => (
          <div onClick={() => dispatch({data: image, type: 'SELECT_IMAGE'})} key={index}>
            <img src={image} />
          </div>
        ))}
      </div>
    </div >
  )
};

upstream.stream.subscribe((data => console.log('upstream', data)));
const Element = reactiveComponent(elementDefinition, 'IMAGE_LIST', 'SELECT_IMAGE');

ReactDOM.render(
  < StreamProvider upstream={upstream} >
  < Element/>
  </ StreamProvider>, 
document.getElementById('root'));
fetchImgs()

