import { createSuperstream, createStatestream } from 'soup-js';
import reducer from './reducer.js';

const image$ = (superstream) => {
  return superstream.filterForActionTypes(['SELECT_IMAGE', 'IMAGE_LIST'])
}

export default image$;