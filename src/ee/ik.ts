/**
 * Isikukood (Estonian Personal ID number).
 *
 * The number consists of 11 digits: the first indicates the gender and century
 * the person was born in, the following 6 digits the birth date, followed by a
 * 3 digit serial and a check digit.
 *
 * Source
 *    https://www.riigiteataja.ee/akt/106032012004
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYYYMMDD, strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

export function ikCheck(value: string): boolean {
  const [front, check] = strings.splitAt(value, -1);

  let sum = weightedSum(front, {
    modulus: 11,
    weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6],
  });
  if (sum === 10) {
    sum = weightedSum(front, {
      modulus: 11,
      weights: [3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    });
  }

  return String(sum % 10) === check;
}

export function ikCheckDate(value: string): boolean {
  let century;

  switch (value[0]) {
    case '1':
    case '2':
      century = '18';
      break;
    case '3':
    case '4':
      century = '19';
      break;
    case '5':
    case '6':
      century = '20';
      break;
    case '7':
    case '8':
      century = '21';
      break;
    default:
      return false;
  }

  return isValidDateCompactYYYYMMDD(`${century}${value.substr(1, 6)}`);
}

const impl: Validator = {
  name: 'Estonian Personal ID Number',
  localName: 'Isikukood',
  abbreviation: 'IK',
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
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!ikCheck(value)) {
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
