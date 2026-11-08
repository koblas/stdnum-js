/**
 * TIN (Armenian Tax Identification Number).
 *
 * The Armenian TIN (ՀՎՀՀ) is issued to individuals and entities. It has 8
 * digits: a 7 digit serial number followed by a check digit. The check digit
 * algorithm is not published, so only the length and digits are checked.
 *
 * Source
 *   https://www.oecd.org/content/dam/oecd/en/topics/policy-issue-focus/aeoi/armenia-tin.pdf
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
  name: 'Armenian Tax Identification Number',
  localName: 'Հարկ վճարողի հաշվառման համար',
  abbreviation: 'ՀՎՀՀ',

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
    if (value.length !== 8) {
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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
