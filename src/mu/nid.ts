/**
 * ID number (Mauritian national identifier).
 *
 * The Mauritian national ID number is a unique 14 alphanumeric identifier
 * assigned at birth to identify individuals. It is displayed on the National
 * Identity Card.
 *
 * The number consists of one alphabetic character and thirteen digits:
 *  - the first character of the person's surname at birth
 *  - 2 digits for day of birth
 *  - 2 digits for month of birth
 *  - 2 digits for year of birth
 *  - 6 digit unique id
 *  - a check digit
 *
 * Source
 *     https://mnis.govmu.org/English/ID%20Card/Pages/default.aspx
 *
 * PERSONENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const nidRe = /^[A-Z][0-9]+[0-9A-Z]$/;

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'Mauritian National Identifier',
  localName: 'National Identifier',
  abbreviation: 'NID',
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
    if (value.length !== 14) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!nidRe.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, -1);
    const sum = weightedSum(front, {
      weights: [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      alphabet: ALPHABET,
      modulus: 17,
    });

    if (ALPHABET[17 - sum] !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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
