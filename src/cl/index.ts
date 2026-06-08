import { Validator } from '../types/types';
import * as run from './run';
import * as rut from './rut';

export type CL = {
  run: Validator;
  rut: Validator;
};

const impl: CL = {
  run: run,
  rut: rut,
};

export default impl;
