/**
 * Codice Fiscale (Italian tax code for individuals).
 *
 * The Codice Fiscale is an alphanumeric code of 16 characters used to identify
 * individuals residing in Italy or 11 digits for non-individuals in which case
 * it matches the Imposta sul valore aggiunto.
 *
 * The 16 digit number consists of three characters derived from the person's
 * last name, three from the person's first name, five that hold information on
 * the person's gender and birth date, four that represent the person's place of
 * birth and one check digit.
 *
 * Source
 *   https://it.m.wikipedia.org/wiki/Codice_fiscale
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

const checkRe =
  /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1}$/;

const CHECK_CODE_ODD: Record<string, number> = {
  0: 1,
  1: 0,
  2: 5,
  3: 7,
  4: 9,
  5: 13,
  6: 15,
  7: 17,
  8: 19,
  9: 21,
  A: 1,
  B: 0,
  C: 5,
  D: 7,
  E: 9,
  F: 13,
  G: 15,
  H: 17,
  I: 19,
  J: 21,
  K: 2,
  L: 4,
  M: 18,
  N: 20,
  O: 11,
  P: 3,
  Q: 6,
  R: 8,
  S: 12,
  T: 14,
  U: 16,
  V: 10,
  W: 22,
  X: 25,
  Y: 24,
  Z: 23,
};

const CHECK_CODE_EVEN: Record<string, number> = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
};

const CHECK_CODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -:');
}

const impl: Validator = {
  name: 'Italian Tax Code',
  localName: 'Codice Fiscale',
  abbreviation: 'CF',
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
    if (value.length !== 16) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!checkRe.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, -1);

    const sum = front
      .split('')
      .reduce(
        (acc, v, idx) =>
          (acc + (idx % 2 === 1 ? CHECK_CODE_EVEN[v] : CHECK_CODE_ODD[v])) % 26,
        0,
      );

    if (CHECK_CODE_CHARS[sum] !== check) {
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
