import { Validator } from '../types/types';
import * as kennitala from './kennitala';
import * as vsk from './vsk';

export type IS = {
  kennitala: Validator;
  vsk: Validator;
};

export const impl: IS = {
  kennitala,
  vsk,
};

export default impl;
