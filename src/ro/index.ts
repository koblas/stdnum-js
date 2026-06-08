import { Validator } from '../types/types';
import * as cif from './cif';
import * as cnp from './cnp';
import * as cui from './cui';
import * as onrc from './onrc';

export type RO = {
  cif: Validator;
  cnp: Validator;
  cui: Validator;
  onrc: Validator;
};

export const impl: RO = {
  cif,
  cnp,
  cui,
  onrc,
};

export default impl;
