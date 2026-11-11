/**
 * TIN (Georgian Tax Identification Number).
 *
 * Georgian citizens, including individual entrepreneurs, use their 11 digit
 * personal number (პირადი ნომერი) as TIN. Legal entities use the 9 digit
 * identification code (საიდენტიფიკაციო კოდი) from the National Agency of
 * Public Registry, and foreign individuals get a 9 digit number from the
 * Revenue Service. No check digit algorithm is published for either, so only
 * the length and digits are checked.
 *
 * Source
 *   https://www.oecd.org/content/dam/oecd/en/topics/policy-issue-focus/aeoi/georgia-tin.pdf
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./');
}

const impl: Validator = {
  name: 'Georgian Tax Identification Number',
  localName: 'საგადასახადო საიდენტიფიკაციო ნომერი',
  abbreviation: 'TIN',
  examples: ['123456789', '01234567890'],
  formats: ['nnnnnnnnn', 'nnnnnnnnnnn'],

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
    if (value.length !== 9 && value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    // 11 digits: a citizen's personal number. 9 digits: a legal entity or a
    // foreign individual, which the number alone doesn't distinguish.
    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: value.length === 9,
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
