import { Validator } from '../types/types';
import * as npwp from './npwp';

export type ID = {
  npwp: Validator;
};

export const impl: ID = {
  npwp,
};

export default impl;
