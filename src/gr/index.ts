import { Validator } from '../types/types';
import * as amka from './amka';
import * as vat from './vat';

export type GR = {
  amka: Validator;
  vat: Validator;
};

export const impl: GR = {
  amka,
  vat,
};

export default impl;
