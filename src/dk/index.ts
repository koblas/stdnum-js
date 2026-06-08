import { Validator } from '../types/types';
import * as cpr from './cpr';
import * as cvr from './cvr';

export type DK = {
  cpr: Validator;
  cvr: Validator;
};

export const impl: DK = {
  cpr,
  cvr,
};

export default impl;
