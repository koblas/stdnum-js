import { Validator } from '../types/types';
import * as nic from './nic';

export type LK = {
  nic: Validator;
};

export const impl: LK = {
  nic,
};

export default impl;
