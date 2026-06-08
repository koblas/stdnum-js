import { Validator } from '../types/types';
import * as tckimlik from './tckimlik';
import * as vkn from './vkn';

export type TR = {
  tckimlik: Validator;
  vkn: Validator;
};

export const impl: TR = {
  tckimlik,
  vkn,
};

export default impl;
