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
 * Only the province (first 2 digits) of the location code is checked, against
 * the GB/T 2260 province codes. python-stdnum also checks the full 6 digit
 * county code against a dated list.
 *
 * Birth dates in the future are rejected; python-stdnum only checks that the
 * date exists. See https://github.com/koblas/stdnum-js/issues/91.
 *
 * Source
 *   https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/cn/ric.py
 *   https://zh.wikipedia.org/wiki/中华人民共和国行政区划代码
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';
import { isValidDateCompactYYYYMMDD } from '../util/isValidDate';

// GB/T 2260 province codes (71 Taiwan, 81 Hong Kong, 82 Macau)
// prettier-ignore
const PROVINCES = new Set([
  '11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34',
  '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52',
  '53', '54', '61', '62', '63', '64', '65', '71', '81', '82',
]);

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

    if (!isValidDateCompactYYYYMMDD(front.substring(6, 14), true)) {
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
    if (!PROVINCES.has(front.slice(0, 2))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
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
