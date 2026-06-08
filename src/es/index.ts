import { Validator } from '../types/types';
import * as cif from './cif';
import * as dni from './dni';
import * as nie from './nie';
import * as nif from './nif';
import * as nss from './nss';

export type ES = {
  cif: Validator;
  dni: Validator;
  nie: Validator;
  nif: Validator;
  nss: Validator;
};

export const impl: ES = {
  cif,
  dni,
  nie,
  nif,
  nss,
};

export default impl;
