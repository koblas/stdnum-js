import { Validator } from '../types/types';
import * as cui from './cui';
import * as nit from './nit';

export type GT = {
  cui: Validator;
  nit: Validator;
};

export const impl: GT = {
  cui,
  nit,
};

export default impl;
