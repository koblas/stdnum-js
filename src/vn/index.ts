import { Validator } from '../types/types';
import * as mst from './mst';

export type VN = {
  mst: Validator;
};

export const impl: VN = {
  mst,
};

export default impl;
