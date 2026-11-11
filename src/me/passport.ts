/**
 * Montenegrin Passport Number (Crnogorski pasoš).
 *
 * Format: Montenegrin passport serial reported as a numeric string (the project currently uses 9 digits). Some references suggest 8 digits, but no authoritative source confirms the exact length.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Montenegrin_passport
 *   https://www.consilium.europa.eu/prado/en/MNE-AS-01001/index.html
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Montenegro.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{9}$/;

const impl: Validator = {
  name: 'Montenegrin Passport Number',
  localName: 'Crnogorski pasoš',
  abbreviation: 'Passport',
  examples: ['123456789'],
  formats: ['nnnnnnnnn'],

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return value;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }

    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const match = value.match(idRegexp);
    if (!match) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: false,
    };
  },
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
