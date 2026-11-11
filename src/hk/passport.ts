/**
 * Hong Kong Passport Number (香港特區護照).
 *
 * Format: One or two uppercase letters, followed by six digits, ending with one or two letters or digits. Total 8 to 10 characters.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Hong_Kong_Special_Administrative_Region_passport
 *   https://www.immd.gov.hk/eng/residents/immigration/traveldoc/hksarpassport/characteristics.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{1,2}\d{6}[A-Z0-9]{1,2}$/;

const impl: Validator = {
  name: 'Hong Kong Passport Number',
  localName: '香港特區護照',
  abbreviation: 'Passport',
  examples: ['A1234567', 'AB123456C'],
  formats: ['annnnnnc', 'acnnnnncc', 'aannnnnncc'],

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

    if (value.length < 8 || value.length > 10) {
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
