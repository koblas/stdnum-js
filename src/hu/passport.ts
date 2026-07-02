/**
 * Hungarian Passport Number (Magyar útlevél).
 *
 * Format: Two uppercase letters followed by six digits (older blue passport) or seven digits (newer burgundy/biometric passport), no spaces or delimiters.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-hungary-passport-number
 *   https://en.wikipedia.org/wiki/Hungarian_passport
 *   https://www.refworld.org/docid/4dd23900394.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}\d{6}$|^[A-Z]{2}\d{7}$/;

const impl: Validator = {
  name: 'Hungarian Passport Number',
  localName: 'Magyar útlevél',
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
