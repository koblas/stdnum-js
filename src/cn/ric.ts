/**
 * RIC No. (Chinese Resident Identity Card Number).
 *
 * The RIC No. is the unique identifier for issued to China (PRC) residents.
 *
 * The number consist of 18 digits in four sections. The first 6 digits refers to
 * the resident's location, followed by 8 digits represeting the resident's birth
 * day in the form YYYY-MM-DD. The next 3 digits is the order code which is the
 * code used to disambiguate people with the same date of birth and address code.
 * Men are assigned to odd numbers, women assigned to even numbers. The final
 * digit is the checksum.
 *
 * Source
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';
import { isValidDateCompactYYYYMMDD } from '../util/isValidDate';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'Chinese Resident Identity Card Number',
  localName: '居民身份证',
  abbreviation: 'RIC No',
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
    if (value.length !== 18) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    const [front, check] = strings.splitAt(value, 17);
    if (!strings.isdigits(front)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!isValidDateCompactYYYYMMDD(front.substr(6, 8))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const checkValue = weightedSum(front, {
      weights: [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      modulus: 11,
    });

    const digit = '10X98765432'[checkValue];

    if (check !== digit) {
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
