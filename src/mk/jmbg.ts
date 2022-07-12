/**
 * Macedonian JMBG
 * https://en.wikipedia.org/wiki/Unique_Master_Citizen_Number
 */

import { Validator } from '../types';
import * as jmbg from '../ba/jmbg';

const impl: Validator = {
  ...jmbg,
  name: 'Macedonian Unique Master Citizen Number',
  localName: 'Единствен матичен број на граѓанинот',
  abbreviation: 'ЕМБГ',
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
