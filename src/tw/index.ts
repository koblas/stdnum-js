import { Validator } from '../types/types';
import * as ubn from './ubn';
import * as ban from './ban';
import * as natid from './natid';
import * as ui from './ui';
import * as tax_code from './tax_code';

export type TW = {
  ubn: Validator;
  ban: Validator;
  natid: Validator;
  ui: Validator;
  tax_code: Validator;
};

export const impl: TW = {
  ubn,
  ban,
  natid,
  ui,
  tax_code,
};

export default impl;
