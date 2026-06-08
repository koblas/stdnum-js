import { Validator } from '../types/types';
import * as brn from './brn';
import * as rrn from './rrn';

export type KR = {
  brn: Validator;
  rrn: Validator;
};

export const impl: KR = {
  brn,
  rrn,
};

export default impl;
