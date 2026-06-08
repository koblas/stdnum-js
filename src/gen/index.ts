import { Validator } from '../types/types';
import * as ean from './ean';

export type GEN = {
  ean: Validator;
};

export const impl: GEN = {
  ean,
};

export default impl;
