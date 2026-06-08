import { Validator } from '../types/types';
import * as nit from './nit';

export type SV = {
  nit: Validator;
};

export const impl: SV = {
  nit,
};

export default impl;
