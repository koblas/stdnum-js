import { Validator } from '../types/types';
import * as ci from './ci';

export type BO = {
  ci: Validator;
};

const impl: BO = {
  ci: ci,
};

export default impl;
