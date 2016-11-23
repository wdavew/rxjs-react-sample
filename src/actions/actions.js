export const IMAGE_SELECTED = 'IMAGE_SELECTED';
const LOAD_IMAGES = 'LOAD_IMAGES';
export const INCR_TIME = 'INCR_TIME';

export function selectImage(image) {
  return {
    type: IMAGE_SELECTED,
    image
  }
}

export function loadImages() {
  return {
    type: LOAD_IMAGES
  }
}

export function timeIncr(x, y) {
  return {
    type: INCR_TIME,
    x
  }
}