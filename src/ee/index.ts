import { Validator } from '../types/types';
import * as ik from './ik';
import * as kmkr from './kmkr';
import * as registrikood from './registrikood';

export type EE = {
  ik: Validator;
  kmkr: Validator;
  registrikood: Validator;
};

export const impl: EE = {
  ik,
  kmkr,
  registrikood,
};

export default impl;
