import { Validator } from '../types/types';
import * as rif from './rif';

export type VE = {
  rif: Validator;
};

export const impl: VE = {
  rif,
};

export default impl;
