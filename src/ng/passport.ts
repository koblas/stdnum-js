/**
 * Nigerian Passport Number (Nigerian passport).
 *
 * Format: Nigerian e-passport number is one letter followed by eight digits (e.g. A12345678), total 9 characters. Confirmed by the QoreID identity-verification API documentation, which shows passportNo examples like A10000001, and by general format descriptions citing 'eight digits and one letter'.
 *
 * Source
 *   https://docs.qoreid.com/docs/international-passport
 *   https://en.wikipedia.org/wiki/Nigerian_passport
 *   https://www.legit.ng/1137052-where-nigerian-passport-book-number-located.html
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
  name: 'Nigerian Passport Number',
  localName: 'Nigerian passport',
  abbreviation: 'PASSPORT',
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
