import { Validator } from '../types/types';
import * as cc from './cc';
import * as nif from './nif';
import * as nipc from './nipc';

export type PT = {
  cc: Validator;
  nif: Validator;
  nipc: Validator;
};

export const impl: PT = {
  cc,
  nif,
  nipc,
};

export default impl;
