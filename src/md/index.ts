import { Validator } from '../types/types';
import * as idno from './idno';

export type MD = {
  idno: Validator;
};

export const impl: MD = {
  idno,
};

export default impl;
