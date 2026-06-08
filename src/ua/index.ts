import { Validator } from '../types/types';
import * as edrpou from './edrpou';
import * as rntrc from './rntrc';

export type UA = {
  edrpou: Validator;
  rntrc: Validator;
};

export const impl: UA = {
  edrpou,
  rntrc,
};

export default impl;
