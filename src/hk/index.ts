import { Validator } from '../types/types';
import * as hkid from './hkid';

export type HK = {
  hkid: Validator;
};

export const impl: HK = {
  hkid,
};

export default impl;
