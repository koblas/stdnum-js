/**
 * Ugandan Passport Number (Passapooti ya Uganda).
 *
 * Format: Ugandan passport number is documented (Danske Bank national identifier list) as '8 or 9 digits' in the forms X9999999 (one letter + seven digits), XX999999 (two letters + six digits), or X99999999 (one letter + eight digits). Diplomatic passports use a 'DA' prefix. So one or two leading Latin letters followed by 6-8 digits, 8 or 9 characters total.
 *
 * Source
 *   https://danskebank.fi/-/media/pdf/danske-bank/fi/en/national-identifier-list-final.pdf
 *   https://www.idanalyzer.com/solutions/supported-documents/ug.html
 *   https://en.wikipedia.org/wiki/Ugandan_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{7}$|^[A-Z]{2}\d{6}$|^[A-Z]\d{8}$/;

const impl: Validator = {
  name: 'Ugandan Passport Number',
  localName: 'Passapooti ya Uganda',
  abbreviation: 'PASSPORT',
  examples: ['B1234567', 'DA123456'],
  formats: ['acnnnnnn', 'annnnnnnn'],

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

    if (value.length < 8 || value.length > 9) {
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
