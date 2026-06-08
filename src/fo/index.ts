import { Validator } from '../types/types';
import * as vn from './vn';

export type FO = {
  vn: Validator;
};

export const impl: FO = {
  vn,
};

export default impl;
