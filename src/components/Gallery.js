import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Perf from 'react-addons-perf' 
window.Perf = Perf;
require('../styles/styles.css');

const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;



// STORE
const Rx = require('rxjs/Rx');
const superstream = new Rx.Subject();

const fetchImgs = () => {
  return fetch(API_ENDPOINT).then(function (response) {
    return response.json().then(function (json) {
      const imgList = json.photos.photo.map(
        ({farm, server, id, secret}) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      )
      dispatch({imgList, type: 'IMAGE_LIST'});
      dispatch({selectedImg: imgList[0], type: 'SELECT_IMAGE'});
    });
  });
}

const dispatch = (data) => {
  console.log('DISPATCHING:', data);
  superstream.next(data);
}

const filterStream = (actionType) => {
  return superstream.filter(el => el.type === actionType)
}

const [ajaxStream, selectStream] = ['IMAGE_LIST', 'SELECT_IMAGE'].map(type => filterStream(type));

const renderStream = Rx.Observable.combineLatest(ajaxStream, selectStream, (imgListAction, selectedImgAction) => {
  const {imgList} = imgListAction;
  const {selectedImg} = selectedImgAction;
  console.log('selectedImg', selectedImgAction);
  return (
    <div className="image-gallery">
      <div className="gallery-image">
        <div>
          <img src={selectedImg} />
        </div>
      </div>
      <div className="image-scroller">
        {imgList.map((image, index) => (
          <div onClick={() => dispatch({selectedImg: image, type: 'SELECT_IMAGE'})} key={index}>
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

