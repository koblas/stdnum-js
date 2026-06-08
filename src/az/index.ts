import { Validator } from '../types/types';
import * as pin from './pin';
import * as tin from './tin';

export type AZ = {
  pin: Validator;
  tin: Validator;
};

export const impl: AZ = {
  pin: pin,
  tin: tin,
};

export default impl;
