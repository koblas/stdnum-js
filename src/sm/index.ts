import { Validator } from '../types/types';
import * as coe from './coe';

export type SM = {
  coe: Validator;
};

export const impl: SM = {
  coe,
};

export default impl;
