import { Validator } from '../types/types';
import * as tin from './tin';

export type BZ = {
  tin: Validator;
};

const impl: BZ = {
  tin: tin,
};

export default impl;
