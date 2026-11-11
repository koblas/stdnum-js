/**
 * Japanese Passport Number (日本国旅券).
 *
 * Format: Two uppercase letters followed by seven digits (e.g. TR1234567). This is the standard machine-readable Japanese passport number.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-japan-passport-number
 *   https://www.protecto.ai/blog/personal-dataset-sample-japan-passport-number-download-pii-data-examples/
 *   https://en.wikipedia.org/wiki/Japanese_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}\d{7}$/;

const impl: Validator = {
  name: 'Japanese Passport Number',
  localName: '日本国旅券',
  abbreviation: 'Passport',
  examples: ['TR1234567'],
  formats: ['aannnnnnn'],

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
