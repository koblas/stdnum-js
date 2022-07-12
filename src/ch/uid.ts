/**
 * UID (Unternehmens-Identifikationsnummer, Swiss business identifier).
 *
 * The Swiss UID is used to uniquely identify businesses for taxation purposes.
 * The number consists of a fixed "CHE" prefix, followed by 9 digits that are
 * protected with a simple checksum.
 * This module only supports the "new" format that was introduced in 2011 which
 * completely replaced the "old" 6-digit format in 2014.
 *
 * Source
 *   https://www.uid.admin.ch/
 *   https://de.wikipedia.org/wiki/Unternehmens-Identifikationsnummer
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

const impl: Validator = {
  name: 'Swiss Business Identifier',
  localName: 'Unternehmens-Identifikationsnummer',
  abbreviation: 'UID',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    const [a, b, c, d] = strings.splitAt(value, 3, 6, 9);

    return `${a}-${b}.${c}.${d}`;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value.substr(3)) || !value.startsWith('CHE')) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [, front, check] = strings.splitAt(value, 3, -1);

    const sum = weightedSum(front, {
      modulus: 11,
      weights: [5, 4, 3, 2, 7, 6, 5, 4],
    });

    if (String((11 - sum) % 11) !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
