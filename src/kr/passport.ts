/**
 * South Korean Passport Number (대한민국 여권).
 *
 * Format: Nine alphanumeric characters. Either a letter (M, S, R, O, or D) followed by eight digits; OR a letter (M, S, R, O, or D) followed by three digits, one letter, and four digits (the newer 2021 'Next-Generation' format with an embedded letter).
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-south-korea-passport-number
 *   https://en.namu.wiki/w/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EC%97%AC%EA%B6%8C
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[MSROD]\d{8}$|^[MSROD]\d{3}[A-Z]\d{4}$/;

const impl: Validator = {
  name: 'South Korean Passport Number',
  localName: '대한민국 여권',
  abbreviation: 'Passport',
  examples: ['M12345678', 'M123A4567'],
  formats: ['annncnnnn'],

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
