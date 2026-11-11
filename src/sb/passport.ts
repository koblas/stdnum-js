/**
 * Solomon Islands Passport Number (Solomon Islands passport).
 *
 * Format: No authoritative specification of the Solomon Islands passport number format could be found. Solomon Islands issues ICAO-compliant ePassports (since ~2015-2017, supplied by IRIS Corporation). The current project guess is a 7-digit number.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Solomon_Islands_passport
 *   https://immigration.gov.sb/epassport/
 *   https://www.commerce.gov.sb/departments-units/immigration/passports/i-want-to-apply-for-a/for-an-epassport.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[0-9]{7}$/;

const impl: Validator = {
  name: 'Solomon Islands Passport Number',
  localName: 'Solomon Islands passport',
  abbreviation: 'PASSPORT',
  examples: ['1234567'],
  formats: ['nnnnnnn'],

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
