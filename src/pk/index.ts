import { Validator } from '../types/types';
import * as cnic from './cnic';
import * as ntn from './ntn';

export type PK = {
  cnic: Validator;
  ntn: Validator;
};

export const impl: PK = {
  cnic,
  ntn,
};

export default impl;
