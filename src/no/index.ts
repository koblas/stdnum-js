import { Validator } from '../types/types';
import * as fodselsnummer from './fodselsnummer';
import * as kontonr from './kontonr';
import * as mva from './mva';
import * as orgnr from './orgnr';

export type NO = {
  fodselsnummer: Validator;
  kontonr: Validator;
  mva: Validator;
  orgnr: Validator;
};

export const impl: NO = {
  fodselsnummer,
  kontonr,
  mva,
  orgnr,
};

export default impl;
