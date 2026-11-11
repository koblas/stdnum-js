/**
 * South African Passport Number (South African Passport).
 *
 * Format: One letter followed by 8 digits. The leading letter indicates passport type: A = ordinary/normal, M = maxi, D = diplomatic, T = travel document.
 *
 * Source
 *   https://en.wikipedia.org/wiki/South_African_passport
 *   https://www.consilium.europa.eu/prado/en/ZAF-AO-01001/index.html
 *   https://learn.microsoft.com/en-us/purview/sit-defn-south-africa-identification-number
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{8}$/;

const impl: Validator = {
  name: 'South African Passport Number',
  localName: 'South African Passport',
  abbreviation: 'Passport',
  examples: ['A12345678'],
  formats: ['annnnnnnn'],

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
