/**
 * UBN (Unified Business Number, 統一編號, Taiwanese tax number).
 *
 * The Unified Business Number (UBN, 統一編號) is the number assigned to businesses
 * within Taiwan for tax (VAT) purposes. The number consists of 8 digits, the
 * last being a check digit.
 *
 * Since 2023-04-01 the Ministry of Finance relaxed the check-digit logic from
 * "the weighted digit sum is divisible by 10" to "divisible by 5", so that the
 * number space can be expanded while staying compatible with existing numbers
 * (every old, divisible-by-10 number is also divisible by 5).
 *
 * Source
 *    https://zh.wikipedia.org/wiki/統一編號
 *    https://findbiz.nat.gov.tw/fts/query/QueryBar/queryInit.do?request_locale=en
 *    https://www.fia.gov.tw/singlehtml/3?cntId=c4d9cff38c8642ef8872774ee9987283
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Taiwanese Business Administration Number',
  localName: '',
  abbreviation: 'UBN',

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

    const weights = [1, 2, 1, 2, 1, 2, 4, 1];

    const digits = weights
      .map((w, idx) => String(parseInt(value[idx], 10) * w))
      .join('');
    const sum = digits
      .split('')
      .reduce((acc, d) => (acc + parseInt(d, 10)) % 10, 0);

    // The weighted digit sum must be divisible by 5 (was 10 before 2023-04-01).
    // Special case: when the 7th digit is 7 its product 7*4=28 sums to 10, which
    // may be counted as either 1 or 0, so a remainder of 4 is also accepted.
    if (!(sum % 5 === 0 || (value[6] === '7' && (sum + 1) % 5 === 0))) {
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
