import { Validator } from '../types/types';
import * as uen from './uen';

export type SG = {
  uen: Validator;
};

export const impl: SG = {
  uen,
};

export default impl;
