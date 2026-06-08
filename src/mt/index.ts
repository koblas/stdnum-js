import { Validator } from '../types/types';
import * as vat from './vat';

export type MT = {
  vat: Validator;
};

export const impl: MT = {
  vat,
};

export default impl;
