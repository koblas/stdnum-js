import { Validator } from '../types/types';
import * as pvn from './pvn';

export type LV = {
  pvn: Validator;
};

export const impl: LV = {
  pvn,
};

export default impl;
