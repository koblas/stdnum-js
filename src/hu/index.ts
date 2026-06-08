import { Validator } from '../types/types';
import * as anum from './anum';

export type HU = {
  anum: Validator;
};

export const impl: HU = {
  anum,
};

export default impl;
