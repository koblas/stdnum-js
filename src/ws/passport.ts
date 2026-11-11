/**
 * Samoan Passport Number (Samoan passport).
 *
 * Format: Letter 'T' followed by 6 digits (e.g. T123456). The U.S. State Department reciprocity page describes Samoan passport serial ranges such as T161001-T171000 and T158501-T161000, all of form T + 6 digits.
 *
 * Source
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Samoa.html
 *   https://en.wikipedia.org/wiki/Samoan_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^T\d{6}$/;

const impl: Validator = {
  name: 'Samoan Passport Number',
  localName: 'Samoan passport',
  abbreviation: 'PASSPORT',
  examples: ['T123456'],
  formats: ['Tnnnnnn'],

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

    if (value.length !== 7) {
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
