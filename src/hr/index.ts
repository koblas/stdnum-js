import { Validator } from '../types/types';
import * as oib from './oib';

export type HR = {
  oib: Validator;
};

export const impl: HR = {
  oib,
};

export default impl;
