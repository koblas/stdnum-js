import { Validator } from '../types/types';
import * as businessid from './businessid';
import * as tin from './tin';
import * as uid from './uid';
import * as vnr from './vnr';

export type AT = {
  businessid: Validator;
  tin: Validator;
  uid: Validator;
  vnr: Validator;
};

const impl: AT = {
  businessid,
  tin,
  uid,
  vnr,
};

export default impl;
