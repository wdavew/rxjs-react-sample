import Rx from 'rxjs/Rx';

const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;

export const selectImage = (imageUrl) => (
   { data: imageUrl, type: 'SELECT_IMAGE' }
)

export const timeIncr = () => (
  { data: null, type: 'TIME_INCR' }
)

export const fetchImages = (superstream) => {
  return Rx.Observable.fromPromise(
    fetch(API_ENDPOINT).then((response) => response.json())
      .then((json) => json.photos.photo.map(
        ({farm, server, id, secret}) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      ))
  ).flatMap((urlArray) => {
    return Rx.Observable.from([{ data: urlArray, type: 'IMAGE_LIST' }, { data: urlArray[0], type: 'SELECT_IMAGE' }])
  })
    .startWith({ data: null, type: 'REQUEST_IMAGES' }) // maybe add this part to superstream instead
    .takeUntil(superstream.filter(action => action.type === 'REQUEST_ABORT'))
}

export const fetchGalaxy = (superstream) => {
  const init = {
    method: 'GET',
    mode: 'cors'
  }
  return Rx.Observable.fromPromise(
    (fetch('https://upload.wikimedia.org/wikipedia/commons/3/3d/Grzybowa.jpg', init)
    ).then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
    )
    .flatMap((responseString) => {
      return Rx.Observable.of({ data: responseString, type: 'GALAXY_HAS_ARRIVED' }).delay(3000)
    })
    .startWith({ data: null, type: 'REQUEST_GALAXY' }) // maybe add this part to superstream instead
    .takeUntil(superstream.filter(action => action.type === 'REQUEST_ABORT'))
}

export const cancelRequest = (superstream) => (
  {data: null, type: 'REQUEST_ABORT'}
)