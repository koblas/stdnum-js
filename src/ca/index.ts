import { Validator } from '../types/types';
import * as bn from './bn';
import * as sin from './sin';
import * as gst from './gst';
import * as qst from './qst';
import * as pst from './pst';
import * as bc_bhn from './bc_bhn';

export type CA = {
  bn: Validator;
  sin: Validator;
  gst: Validator;
  qst: Validator;
  pst: Validator;
  bc_bhn: Validator;
};

const impl: CA = {
  bn,
  sin,
  gst,
  qst,
  pst,
  bc_bhn,
};

export default impl;
