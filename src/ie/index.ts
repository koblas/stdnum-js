import { Validator } from '../types/types';
import * as vat from './vat';
import * as pps from './pps';

export type IE = {
  vat: Validator;
  pps: Validator;
};

export const impl: IE = {
  vat,
  pps,
};

export default impl;
