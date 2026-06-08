import { Validator } from '../types/types';
import * as tin from './tin';

export type GH = {
  tin: Validator;
};

export const impl: GH = {
  tin,
};

export default impl;
