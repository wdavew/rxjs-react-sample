const defaultState = {
   images: [],
   x: undefined, 
   y: undefined,
};


export default function images(state = defaultState, action) {
  switch (action.type) {
    case 'IMAGE_SELECTED':
    return {...state, selectedImage: action.image};
    case "IMAGES_LOADED":
      return {...state, images: action.images};
    case "INCR_TIME":
      return {...state, x: action.x}
    default:
      return state;
  }
}