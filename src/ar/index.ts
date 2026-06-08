import { Validator } from '../types/types';
import * as cbu from './cbu';
import * as cuit from './cuit';
import * as dni from './dni';

export type AR = {
  cbu: Validator;
  cuit: Validator;
  dni: Validator;
};

const ar: AR = {
  cbu,
  cuit,
  dni,
};

export default ar;
