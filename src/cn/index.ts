import { Validator } from '../types/types';
import * as ric from './ric';
import * as uscc from './uscc';

export type CN = {
  ric: Validator;
  uscc: Validator;
};

const impl: CN = {
  ric,
  uscc,
};

export default impl;
