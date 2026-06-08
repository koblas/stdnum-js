import { Validator } from '../types/types';
import * as cn from './cn';

export type JP = {
  cn: Validator;
};

export const impl: JP = {
  cn,
};

export default impl;
