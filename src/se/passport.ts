/**
 * Swedish Passport Number (Svenskt pass).
 *
 * Format: Swedish passport number: two letters followed by seven digits (e.g. XA0000001) for passports issued since 1 January 2022; older passports use eight digits.
 *
 * Source
 *   https://polisen.se/6d1763c8c5f100deaa40c14acccb5c27/contentassets/773823ae7ffd403abff84fbfce490661/hp2022-bilder-info.pdf
 *   https://learn.microsoft.com/en-us/purview/sit-defn-sweden-passport-number
 *   https://en.wikipedia.org/wiki/Swedish_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^(?:\d{8}|[A-Z]{2}\d{7})$/;

const impl: Validator = {
  name: 'Swedish Passport Number',
  localName: 'Svenskt pass',
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
