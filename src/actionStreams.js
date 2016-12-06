import { createSuperstream, createStatestream } from 'soup-js';

export const image$ = (superstream) => {
  return superstream.filterForActionTypes(['SELECT_IMAGE', 'IMAGE_LIST', 'GALAXY_HAS_ARRIVED'])
}

export const time$ = (superstream) => {
  return superstream.filterForActionTypes(['TIME_INCR'])
}