import { Validator } from '../types/types';
import * as ci from './ci';
import * as ruc from './ruc';

export type EC = {
  ci: Validator;
  ruc: Validator;
};

export const impl: EC = {
  ci,
  ruc,
};

export default impl;
