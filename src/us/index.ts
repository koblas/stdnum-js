import { Validator } from '../types/types';
import * as ein from './ein';
import * as ssn from './ssn';

export type US = {
  ein: Validator;
  ssn: Validator;
};

export const impl: US = {
  ein,
  ssn,
};

export default impl;
