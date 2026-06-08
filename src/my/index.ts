import { Validator } from '../types/types';
import * as nric from './nric';

export type MY = {
  nric: Validator;
};

export const impl: MY = {
  nric,
};

export default impl;
