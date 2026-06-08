import { Validator } from '../types/types';
import * as jmbg from './jmbg';
import * as pib from './pib';

export type ME = {
  jmbg: Validator;
  pib: Validator;
};

export const impl: ME = {
  jmbg,
  pib,
};

export default impl;
