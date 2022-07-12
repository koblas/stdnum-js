/**
 * Serbian JMBG
 * https://en.wikipedia.org/wiki/Unique_Master_Citizen_Number
 */
import { Validator } from '../types';
import * as jmbg from '../ba/jmbg';

const impl: Validator = {
  ...jmbg,
  name: 'Serbian Unique Master Citizen Number',
  localName: 'Јединствени матични број грађана',
  abbreviation: 'ЈМБГ',
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
