import { Validator } from '../types/types';

import * as abn from './abn';
import * as acn from './acn';
import * as tfn from './tfn';

export type AU = {
  abn: Validator;
  acn: Validator;
  tfn: Validator;
};

const impl: AU = {
  abn,
  acn,
  tfn,
};

export default impl;
