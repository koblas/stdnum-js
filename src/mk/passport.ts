/**
 * North Macedonian Passport Number (Македонски пасош).
 *
 * Format: North Macedonian biometric passport serials are commonly a single letter prefix followed by 7 digits (e.g. A1234567), consistent with regional ex-Yugoslav passport conventions. The project's current ^\d{9}$ (9 plain digits) is likely incorrect.
 *
 * Source
 *   https://en.wikipedia.org/wiki/North_Macedonian_passport
 *   https://www.consilium.europa.eu/prado/en/prado-documents/mkd/a/docs-per-category.html
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Macedonia.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{7}$/;

const impl: Validator = {
  name: 'North Macedonian Passport Number',
  localName: 'Македонски пасош',
  abbreviation: 'Passport',
  examples: ['A1234567'],
  formats: ['annnnnnn'],

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

    if (value.length !== 8) {
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
