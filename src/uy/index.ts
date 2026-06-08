import { Validator } from '../types/types';
import * as nie from './nie';
import * as cedula from './cedula';
import * as rut from './rut';

export type UY = {
  nie: Validator;
  cedula: Validator;
  rut: Validator;
};

export const impl: UY = {
  nie,
  cedula,
  rut,
};

export default impl;
