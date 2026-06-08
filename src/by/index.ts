import { Validator } from '../types/types';
import * as unp from './unp';

export type BY = {
  unp: Validator;
};

const impl: BY = {
  unp,
};

export default impl;
