import { Validator } from '../types/types';
import * as idnr from './idnr';
import * as pwnr from './pwnr';
import * as stnr from './stnr';
import * as svnr from './svnr';
import * as vat from './vat';
import * as passport from './passport';

export type DE = {
  idnr: Validator;
  pwnr: Validator;
  stnr: Validator;
  svnr: Validator;
  vat: Validator;
  passport: Validator;
};

export const impl: DE = {
  idnr,
  pwnr,
  stnr,
  svnr,
  vat,
  passport,
};

export default impl;
