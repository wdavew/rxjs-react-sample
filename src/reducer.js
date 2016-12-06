function imageReducer(state = {}, action) {
  switch(action.type) {
    case 'SELECT_IMAGE':
      return Object.assign({}, state, {selectedImage: action.data});
    case 'IMAGE_LIST':
      return Object.assign({}, state, {images: action.data});
  }
  return state;
};

function timeReducer(state = {x: 0}, action) {
  switch(action.type) {
    case 'TIME_INCR':
      return Object.assign({}, state, {x: (state.x + 50)})
  }
  return state;
};

export {imageReducer, timeReducer}