/**
 * Slovene JMBG
 *
 * https://en.wikipedia.org/wiki/Unique_Master_Citizen_Number
 *
 * This is really the EMSO -- here for legacy support
 */

import { Validator } from '../types';
import * as jmbg from '../ba/jmbg';

const impl: Validator = {
  ...jmbg,
  name: 'Slovene Unique Master Citizen Number',
  localName: 'Enotna Matična Številka Občana',
  abbreviation: 'EMŠO',
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
