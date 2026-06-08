import { Validator } from '../types/types';
import * as idnr from './idnr';
import * as moa from './moa';
import * as tin from './tin';

export type TH = {
  idnr: Validator;
  moa: Validator;
  tin: Validator;
};

export const impl: TH = {
  idnr,
  moa,
  tin,
};

export default impl;
