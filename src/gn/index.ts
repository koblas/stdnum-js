import { Validator } from '../types/types';
import * as nifp from './nifp';

export type GN = {
  nifp: Validator;
};

export const impl: GN = {
  nifp,
};

export default impl;
