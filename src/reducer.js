function reducer(state = {}, action) {
  console.log('reducer received', action);
  switch(action.type) {
    case 'SELECT_IMAGE':
      return Object.assign({}, state, {selectedImage: action.data});
    case 'IMAGE_LIST':
      return Object.assign({}, state, {images: action.data});
  }
  return state;
};

export default reducer;