import { Validator } from '../types/types';
import * as ssn from './ssn';
import * as uid from './uid';
import * as vat from './vat';

export type CH = {
  ssn: Validator;
  uid: Validator;
  vat: Validator;
};

export const impl: CH = {
  ssn,
  uid,
  vat,
};

export default impl;
