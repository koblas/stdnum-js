import { Validator } from '../types/types';
import * as aadhaar from './aadhaar';
import * as pan from './pan';
import * as vid from './vid';
import * as epic from './epic';
import * as gstin from './gstin';

export type IN = {
  aadhaar: Validator;
  pan: Validator;
  vid: Validator;
  epic: Validator;
  gstin: Validator;
};

export const impl: IN = {
  aadhaar,
  pan,
  vid,
  epic,
  gstin,
};

export default impl;
