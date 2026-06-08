import { Validator } from '../types/types';
import * as pin from './pin';

export type KE = {
  pin: Validator;
};

export const impl: KE = {
  pin,
};

export default impl;
