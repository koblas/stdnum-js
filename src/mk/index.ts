import { Validator } from '../types/types';
import * as jmbg from './jmbg';
import * as edb from './edb';

export type MK = {
  jmbg: Validator;
  edb: Validator;
};

export const impl: MK = {
  jmbg,
  edb,
};

export default impl;
