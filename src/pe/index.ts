import { Validator } from '../types/types';
import * as ce from './ce';
import * as cui from './cui';
import * as ruc from './ruc';

export type PE = {
  ce: Validator;
  cui: Validator;
  ruc: Validator;
};

export const impl: PE = {
  ce,
  cui,
  ruc,
};

export default impl;
