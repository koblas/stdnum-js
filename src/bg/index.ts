import { Validator } from '../types/types';
import * as egn from './egn';
import * as pnf from './pnf';
import * as vat from './vat';

export type BG = {
  egn: Validator;
  pnf: Validator;
  vat: Validator;
};

const impl: BG = {
  egn,
  pnf,
  vat,
};

export default impl;
