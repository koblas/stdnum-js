import { Validator } from '../types/types';
import * as mf from './mf';

export type TN = {
  mf: Validator;
};

export const impl: TN = {
  mf,
};

export default impl;
