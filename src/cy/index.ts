import { Validator } from '../types/types';
import * as vat from './vat';

export type CY = {
  vat: Validator;
};

const impl: CY = {
  vat,
};

export default impl;
