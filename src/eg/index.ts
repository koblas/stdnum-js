import { Validator } from '../types/types';
import * as tn from './tn';

export type EG = {
  tn: Validator;
};

export const impl: EG = {
  tn,
};

export default impl;
