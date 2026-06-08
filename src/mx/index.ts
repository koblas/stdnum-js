import { Validator } from '../types/types';
import * as clabe from './clabe';
import * as curp from './curp';
import * as rfc from './rfc';

export type MX = {
  clabe: Validator;
  curp: Validator;
  rfc: Validator;
};

export const impl: MX = {
  clabe,
  curp,
  rfc,
};

export default impl;
