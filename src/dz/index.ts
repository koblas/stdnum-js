import { Validator } from '../types/types';
import * as nif from './nif';

export type DZ = {
  nif: Validator;
};

export const impl: DZ = {
  nif,
};

export default impl;
