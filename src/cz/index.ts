import { Validator } from '../types/types';
import * as dic from './dic';
import * as ico from './ico';
import * as rc from './rc';

export type CZ = {
  dic: Validator;
  ico: Validator;
  rc: Validator;
};

export const impl: CZ = {
  dic,
  ico,
  rc,
};

export default impl;
