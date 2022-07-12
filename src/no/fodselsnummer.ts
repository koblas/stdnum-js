/**
 * Fødselsnummer (Norwegian birth number, the national identity number).
 *
 * The Fødselsnummer is an eleven-digit number that is built up of the date of
 * birth of the person, a serial number and two check digits.
 *
 * Source:
 *   https://no.wikipedia.org/wiki/F%C3%B8dselsnummer
 *   https://en.wikipedia.org/wiki/National_identification_number#Norway
 *
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDate, strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -:');
}

function checkBirthdate(value: string) {
  // eslint-disable-next-line prefer-const
  let [dd, mm, yy, rest] = strings
    .splitAt(value, 2, 4, 6, 9)
    .map(v => parseInt(v, 10));

  // Correct the birth day for D-numbers. These have a modified first digit.
  // https://no.wikipedia.org/wiki/F%C3%B8dselsnummer#D-nummer
  if (dd > 40) {
    dd -= 40;
  }
  // Correct the birth month for H-numbers. These have a modified third digit.
  // https://no.wikipedia.org/wiki/F%C3%B8dselsnummer#H-nummer
  if (mm > 40) {
    mm -= 40;
  }
  if (rest < 500) {
    yy += 1900;
  } else if (rest < 750 && yy > 54) {
    yy += 1800;
  } else if (rest < 1000 && yy < 40) {
    yy += 2000;
  } else if (rest < 1000 && yy >= 40) {
    yy += 1900;
  } else {
    return false;
  }

  return isValidDate(String(yy), String(mm), String(dd));
}

const impl: Validator = {
  name: 'Norwegian National Identity Number',
  localName: 'Fødselsnummer',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 6).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!checkBirthdate(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front1, check1] = strings.splitAt(value, 9, 10);
    const [front2, check2] = strings.splitAt(value, 10);

    const sum1 = weightedSum(front1, {
      weights: [3, 7, 6, 1, 8, 9, 4, 5, 2],
      modulus: 11,
    });
    const sum2 = weightedSum(front2, {
      weights: [5, 4, 3, 2, 7, 6, 5, 4, 3, 2],
      modulus: 11,
    });

    if (String(11 - sum1) !== check1 || String(11 - sum2) !== check2) {
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
