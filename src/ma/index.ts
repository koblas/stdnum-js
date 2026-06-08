import { Validator } from '../types/types';
import * as ice from './ice';
import * as ice9 from './ice9';

export type MA = {
  ice: Validator;
  ice9: Validator;
};

export const impl: MA = {
  ice,
  ice9,
};

export default impl;
