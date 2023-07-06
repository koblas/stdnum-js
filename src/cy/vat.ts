/**
 * Αριθμός Εγγραφής Φ.Π.Α. (Cypriot VAT number).
 *
 * The Cypriot Αριθμός Εγγραφής Φ.Π.Α. (VAT) number consists of 9 digits
 * where the last one is a is a letter and functions as a check digit.
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const weights: Record<string, number> = {
  '0': 1,
  '1': 0,
  '2': 5,
  '3': 7,
  '4': 9,
  '5': 13,
  '6': 15,
  '7': 17,
  '8': 19,
  '9': 21,
};

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -');

  if (err !== null) {
    return [value, err];
  }
  if (value.startsWith('CY')) {
    return [value.substr(2), null];
  }

  return [value, null];
}

const impl: Validator = {
  name: 'Cypriot VAT Number',
  localName: 'Αριθμός Εγγραφής Φ.Π.Α.',
  abbreviation: 'ΦΠΑ',

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
    const [front, check] = strings.splitAt(value, -1);
    if (!strings.isdigits(front)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!alphabet.includes(check)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const sum = front
      .split('')
      .map(v => parseInt(v, 10))
      .reduce((acc, v, idx) => acc + (idx % 2 === 0 ? weights[v] : v), 0);

    if (alphabet[sum % 26] !== check) {
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
