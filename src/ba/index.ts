import { Validator } from '../types/types';
import * as jmbg from './jmbg';

export type BA = {
  jmbg: Validator;
};

export const impl: BA = {
  jmbg,
};

export default impl;
