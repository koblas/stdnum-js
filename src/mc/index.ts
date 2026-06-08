import { Validator } from '../types/types';
import * as tva from './tva';

export type MC = {
  tva: Validator;
};

export const impl: MC = {
  tva,
};

export default impl;
