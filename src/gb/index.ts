import { Validator } from '../types/types';
import * as nino from './nino';
import * as utr from './utr';
import * as vat from './vat';

export type GB = {
  nino: Validator;
  utr: Validator;
  vat: Validator;
};

export const impl: GB = {
  nino,
  utr,
  vat,
};

export default impl;
