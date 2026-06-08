import { Validator } from '../types/types';
import * as nif from './nif';
import * as nir from './nir';
import * as siren from './siren';
import * as siret from './siret';
import * as tva from './tva';

export type FR = {
  nif: Validator;
  nir: Validator;
  siren: Validator;
  siret: Validator;
  tva: Validator;
};

export const impl: FR = {
  nif,
  nir,
  siren,
  siret,
  tva,
};

export default impl;
