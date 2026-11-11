/**
 * Ghanaian Passport Number (Ghana Passport).
 *
 * Format: Ghana passport number is 8 characters: either one letter followed by 7 digits (X9999999), or two letters followed by 6 digits (XX999999). The leading letter denotes passport category (e.g. 'A' for ordinary citizen, 'G' on biometric series).
 *
 * Source
 *   https://danskebank.fi/-/media/pdf/danske-bank/fi/en/national-identifier-list-final.pdf
 *   https://en.wikipedia.org/wiki/Ghanaian_passport
 *   https://www.consilium.europa.eu/prado/en/prado-documents/gha/a/docs-per-category.html
 *   https://mykingsgate.co.za/info/ghana-passport-number-starting-with-a-6086/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^([A-Z]\d{7}|[A-Z]{2}\d{6})$/;

const impl: Validator = {
  name: 'Ghanaian Passport Number',
  localName: 'Ghana Passport',
  abbreviation: 'Passport',
  examples: ['G1234567', 'AA123456'],
  formats: ['acnnnnnn'],

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
