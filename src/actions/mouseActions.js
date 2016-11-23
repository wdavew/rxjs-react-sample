export const MOUSE_MOVE = 'MOUSE_MOVE';

export function selectImage(x, y) {
  console.log(x, y);
  return {
    type: MOUSE_MOVE,
    x,
    y
  }
}