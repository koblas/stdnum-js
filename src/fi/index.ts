import { Validator } from '../types/types';
import * as alv from './alv';
import * as hetu from './hetu';
import * as ytunnus from './ytunnus';

export type FI = {
  alv: Validator;
  hetu: Validator;
  ytunnus: Validator;
};

export const impl: FI = {
  alv,
  hetu,
  ytunnus,
};

export default impl;
