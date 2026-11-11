/**
 * Cypriot Passport Number (Κυπριακό διαβατήριο).
 *
 * Format: One uppercase letter followed by 6 to 8 digits, no spaces or delimiters (per Microsoft Purview Cyprus passport SIT). Current passport series begin with letters such as K then L.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-cyprus-passport-number
 *   https://en.wikipedia.org/wiki/Cypriot_passport
 *   https://www.consilium.europa.eu/prado/en/CYP-AO-04002/index.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{6,8}$/;

const impl: Validator = {
  name: 'Cypriot Passport Number',
  localName: 'Κυπριακό διαβατήριο',
  abbreviation: 'Passport',
  examples: ['K123456', 'L12345678'],
  formats: ['annnnnn', 'annnnnnnn', 'annnnnnn'],

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

    if (value.length < 7 || value.length > 9) {
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
