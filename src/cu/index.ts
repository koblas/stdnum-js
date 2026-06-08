import { Validator } from '../types/types';
import * as ni from './ni';

export type CU = {
  ni: Validator;
};

const impl: CU = {
  ni,
};

export default impl;
