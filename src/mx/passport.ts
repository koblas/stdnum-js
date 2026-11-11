/**
 * Mexican Passport Number (Pasaporte mexicano).
 *
 * Format: One letter (series, e.g. G/J/N) followed by eight digits.
 *
 * Source
 *   https://github.com/validatorjs/validator.js/issues/2641
 *   https://en.wikipedia.org/wiki/Mexican_passport
 *   https://trustdochub.com/en/verify-mexican-passport/
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
  name: 'Mexican Passport Number',
  localName: 'Pasaporte mexicano',
  abbreviation: 'Passport',
  examples: ['G12345678'],
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
