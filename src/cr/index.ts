import { Validator } from '../types/types';
import * as cpf from './cpf';
import * as cpj from './cpj';
import * as cr from './cr';

export type CR = {
  cpf: Validator;
  cpj: Validator;
  cr: Validator;
};

const impl: CR = {
  cpf,
  cpj,
  cr,
};

export default impl;
