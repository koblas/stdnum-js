import { Validator } from '../types/types';
import * as asmens from './asmens';
import * as pvm from './pvm';

export type LT = {
  asmens: Validator;
  pvm: Validator;
};

export const impl: LT = {
  asmens,
  pvm,
};

export default impl;
