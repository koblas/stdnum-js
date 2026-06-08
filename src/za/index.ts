import { Validator } from '../types/types';
import * as tin from './tin';
import * as idnr from './idnr';
import * as vat from './vat';

export type ZA = {
  tin: Validator;
  idnr: Validator;
  vat: Validator;
};

export const impl: ZA = {
  tin,
  idnr,
  vat,
};

export default impl;
