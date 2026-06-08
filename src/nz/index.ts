import { Validator } from '../types/types';
import * as ird from './ird';
import * as bank from './bank';

export type NZ = {
  ird: Validator;
  bank: Validator;
};

export const impl: NZ = {
  ird,
  bank,
};

export default impl;
