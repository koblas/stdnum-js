import { Validator } from '../types/types';
import * as tin from './tin';

export type AI = {
  tin: Validator;
};

const impl: AI = {
  tin,
};

export default impl;
