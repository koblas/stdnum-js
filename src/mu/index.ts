import { Validator } from '../types/types';
import * as nid from './nid';

export type MU = {
  nid: Validator;
};

export const impl: MU = {
  nid,
};

export default impl;
