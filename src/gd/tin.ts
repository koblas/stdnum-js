/**
 * TIN (Grenada Tax Identification Number).
 *
 * The Grenada TIN is issued by the Inland Revenue Division to individuals and
 * entities. It is a unique 6 digit number with no published structure or
 * check digit.
 *
 * Source
 *   https://www.oecd.org/content/dam/oecd/en/topics/policy-issue-focus/aeoi/grenada-tin.pdf
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
  name: 'Grenada Tax Identification Number',
  localName: 'Tax Identification Number',
  abbreviation: 'TIN',
  examples: ['123456'],
  formats: ['nnnnnn'],

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
    if (value.length !== 6) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: true,
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
