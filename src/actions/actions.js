export const IMAGE_SELECTED = 'IMAGE_SELECTED';
const LOAD_IMAGES = 'LOAD_IMAGES';
export const MOUSE_MOVE = 'MOUSE_MOVE';

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

export function mouseMove(x, y) {
  return {
    type: MOUSE_MOVE,
    x,
    y
  }
}