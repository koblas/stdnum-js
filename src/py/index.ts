import { Validator } from '../types/types';
import * as ruc from './ruc';
import * as cedula from './cedula';

export type PY = {
  ruc: Validator;
  cedula: Validator;
};

export const impl: PY = {
  ruc,
  cedula,
};

export default impl;
