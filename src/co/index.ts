import { Validator } from '../types/types';
import * as nit from './nit';

export type CO = {
  nit: Validator;
};

const impl: CO = {
  nit,
};

export default impl;
