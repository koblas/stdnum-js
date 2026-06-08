import { Validator } from '../types/types';
import * as bsn from './bsn';
import * as btw from './btw';
import * as onderwijsnummer from './onderwijsnummer';

export type NL = {
  bsn: Validator;
  btw: Validator;
  onderwijsnummer: Validator;
};

export const impl: NL = {
  bsn,
  btw,
  onderwijsnummer,
};

export default impl;
