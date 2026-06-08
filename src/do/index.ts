import { Validator } from '../types/types';
import * as cedula from './cedula';
import * as ncf from './ncf';
import * as rnc from './rnc';

export type DO = {
  cedula: Validator;
  ncf: Validator;
  rnc: Validator;
};

export const impl: DO = {
  cedula,
  ncf,
  rnc,
};

export default impl;
