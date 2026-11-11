/**
 * Turkish Passport Number (Türk pasaportu).
 *
 * Format: One uppercase letter followed by eight digits (e.g. U12345678). This is the standard Turkish machine-readable/biometric passport serial.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Turkish_passport
 *   https://www.consilium.europa.eu/prado/en/prado-documents/tur/a/docs-per-category.html
 *   https://www.guideconsultants.com/passports/turkey-passport/
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
  name: 'Turkish Passport Number',
  localName: 'Türk pasaportu',
  abbreviation: 'Passport',
  examples: ['U12345678'],
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
