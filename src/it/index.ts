import { Validator } from '../types/types';
import * as aic from './aic';
import * as codicefiscale from './codicefiscale';
import * as iva from './iva';

export type IT = {
  aic: Validator;
  codicefiscale: Validator;
  iva: Validator;
};

export const impl: IT = {
  aic,
  codicefiscale,
  iva,
};

export default impl;
