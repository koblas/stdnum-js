/**
 * Nepalese Passport Number (नेपाली राहदानी).
 *
 * Format: 8 numeric digits. Both the older Machine-Readable Passport (MRP) and the newer IDEMIA e-passport (issued from 17 Nov 2021) use an 8-digit serial. Older MRP serials begin 06/07/08; e-passport serials seen beginning 11 (e.g. 11234567).
 *
 * Source
 *   https://giwmscdntwo.gov.np/media/pdf_upload/Passport%20List%2013%20Feb_1mzczns.pdf
 *   https://en.wikipedia.org/wiki/Nepalese_passport
 *   https://kathmandupost.com/national/2021/11/17/nepal-to-start-issuing-e-passports-from-today
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{8}$/;

const impl: Validator = {
  name: 'Nepalese Passport Number',
  localName: 'नेपाली राहदानी',
  abbreviation: 'PASSPORT',
  examples: ['08123456'],
  formats: ['nnnnnnnn'],

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
