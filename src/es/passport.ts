/**
 * Spanish Passport Number (Pasaporte español).
 *
 * Format: Spanish passport number: an 8- or 9-character combination of letters/numbers — two digits or letters, one optional digit or letter, then six digits (no spaces or delimiters).
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-spain-passport-number
 *   https://en.wikipedia.org/wiki/Spanish_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z0-9]{2}[A-Z0-9]?\d{6}$/;

const impl: Validator = {
  name: 'Spanish Passport Number',
  localName: 'Pasaporte español',
  abbreviation: 'Passport',

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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
