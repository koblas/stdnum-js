import { Validator } from '../types/types';
import * as cnpj from './cnpj';
import * as cpf from './cpf';

export type BR = {
  cnpj: Validator;
  cpf: Validator;
};

const impl: BR = {
  cnpj,
  cpf,
};

export default impl;
