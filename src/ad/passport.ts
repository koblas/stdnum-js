/**
 * Andorran Passport Number (Passaport andorrà).
 *
 * Format: One uppercase letter followed by 7 digits. The official Andorran passport number is documented as a capital 'O' plus seven digits (e.g. O1234567); the regex generalizes the prefix to any letter to tolerate variants and older issues.
 *
 * Source
 *   https://www.morabanc.ad/en/morablog/the-andorran-passport-the-most-secure-passport-in-the-world/
 *   https://en.wikipedia.org/wiki/Andorran_passport
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
  name: 'Andorran Passport Number',
  localName: 'Passaport andorrà',
  abbreviation: 'Passport',
  examples: ['O1234567'],
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
