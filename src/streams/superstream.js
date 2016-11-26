const Rx = require('rxjs/Rx');
const superstream = new Rx.BehaviorSubject();

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
  superstream.next(data);
}

const filterStream = (actionType) => {
  return superstream.filter(value => {
    return value ? (value.type === actionType) : value
  })
}