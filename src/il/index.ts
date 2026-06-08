import { Validator } from '../types/types';
import * as hp from './hp';
import * as idnr from './idnr';

export type IL = {
  hp: Validator;
  idnr: Validator;
};

export const impl: IL = {
  hp,
  idnr,
};

export default impl;
