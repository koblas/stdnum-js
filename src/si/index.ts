import { Validator } from '../types/types';
import * as ddv from './ddv';
import * as jmbg from './jmbg';
import * as emso from './emso';

export type SI = {
  ddv: Validator;
  jmbg: Validator;
  emso: Validator;
};

export const impl: SI = {
  ddv,
  jmbg,
  emso,
};

export default impl;
