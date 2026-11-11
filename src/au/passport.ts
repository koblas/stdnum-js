/**
 * Australian Passport Number (Australian Passport).
 *
 * Format: Either one letter followed by seven digits, or two letters followed by seven digits. Microsoft Purview documents the specific allowed prefixes as single letters N,E,D,F,A,C,U,X and two-letter prefixes PA,PB,PC,PD,PE,PF,PU,PW,PX,PZ.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-australia-passport-number
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{7}$|^[A-Z]{2}\d{7}$/;

const impl: Validator = {
  name: 'Australian Passport Number',
  localName: 'Australian Passport',
  abbreviation: 'Passport',
  examples: ['N1234567', 'PA1234567'],
  formats: ['annnnnnn', 'aannnnnnn'],

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
