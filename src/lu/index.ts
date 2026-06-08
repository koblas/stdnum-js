import { Validator } from '../types/types';
import * as tva from './tva';

export type LU = {
  tva: Validator;
};

export const impl: LU = {
  tva,
};

export default impl;
