import { Validator } from '../types/types';
import * as peid from './peid';

export type LI = {
  peid: Validator;
};

export const impl: LI = {
  peid,
};

export default impl;
