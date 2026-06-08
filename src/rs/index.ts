import { Validator } from '../types/types';
import * as pib from './pib';
import * as jmbg from './jmbg';

export type RS = {
  pib: Validator;
  jmbg: Validator;
};

export const impl: RS = {
  pib,
  jmbg,
};

export default impl;
