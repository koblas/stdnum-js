import { Validator } from '../types/types';
import * as nrt from './nrt';

export type AD = {
  nrt: Validator;
};

const impl: AD = {
  nrt,
};

export default impl;
