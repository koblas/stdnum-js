/**
 * Enotna matična številka občana (Unique Master Citizen Number).
 *
 * The EMŠO is used for uniquely identify persons including foreign citizens
 * living in Slovenia, It is issued by Centralni Register Prebivalstva CRP
 * (Central Citizen Registry).
 * The number consists of 13 digits and includes the person's date of birth, a
 * political region of birth and a unique number that encodes a person's gender
 * followed by a check digit.
 *
 * Source:
 *   https://en.wikipedia.org/wiki/Unique_Master_Citizen_Number
 *   https://sl.wikipedia.org/wiki/Enotna_matična_številka_občana
 */

import { Validator } from '../types';
import * as jmbg from '../ba/jmbg';

const impl: Validator = {
  ...jmbg,
  name: 'Slovene Unique Master Citizen Number',
  localName: 'Enotna Matična Številka Občana',
  abbreviation: 'EMŠO',
  examples: ['0101006500006'],
  formats: ['nnnnnnnnnnnnn'],
};

export const {
  name,
  localName,
  abbreviation,
  examples,
  formats,
  validate,
  format,
  compact,
} = impl;
