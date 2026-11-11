/**
 * Pakistani Passport Number (پاکستانی پاسپورٹ).
 *
 * Format: Modern Pakistani machine-readable/biometric passport numbers are 9 characters: 2 letters followed by 7 digits (e.g. MRZ document number 'AB1234567'). Multiple sources confirm 2 letters + 7 digits = 9 alphanumeric characters.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Pakistani_passport
 *   https://www.epza.com.pk/machine-readable-passport/
 *   https://tidytothemax.com/what-is-passport-number-pakistan/
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
  name: 'Pakistani Passport Number',
  localName: 'پاکستانی پاسپورٹ',
  abbreviation: 'Passport',
  examples: ['AB1234567'],
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
