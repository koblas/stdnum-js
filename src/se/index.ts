import { Validator } from '../types/types';
import * as orgnr from './orgnr';
import * as personnummer from './personnummer';
import * as vat from './vat';

export type SE = {
  orgnr: Validator;
  personnummer: Validator;
  vat: Validator;
};

export const impl: SE = {
  orgnr,
  personnummer,
  vat,
};

export default impl;
