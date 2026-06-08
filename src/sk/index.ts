import { Validator } from '../types/types';
import * as dph from './dph';
import * as rc from './rc';

export type SK = {
  dph: Validator;
  rc: Validator;
};

export const impl: SK = {
  dph,
  rc,
};

export default impl;
