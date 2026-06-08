import { Validator } from '../types/types';
import * as nip from './nip';
import * as pesel from './pesel';
import * as regon from './regon';

export type PL = {
  nip: Validator;
  pesel: Validator;
  regon: Validator;
};

export const impl: PL = {
  nip,
  pesel,
  regon,
};

export default impl;
