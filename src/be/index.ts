import { Validator } from '../types/types';
import * as bis from './bis';
import * as insz from './insz';
import * as nn from './nn';
import * as vat from './vat';

export type BE = {
  bis: Validator;
  insz: Validator;
  nn: Validator;
  vat: Validator;
};

export const impl: BE = {
  bis,
  insz,
  nn,
  vat,
};

export default impl;
