import { Validator } from '../types/types';
import * as inn from './inn';

export type RU = {
  inn: Validator;
};

export const impl: RU = {
  inn,
};

export default impl;
