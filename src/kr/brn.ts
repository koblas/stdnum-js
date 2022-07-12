/**
 * BRN (사업자 등록 번호, South Korea Business Registration Number).
 *
 * The Business Registration Number is issued by the district tax office in the
 * local jurisdiction for tax purposes. The number consists of 10 digits and
 * contain the tax office number (3 digits), the type of business (2 digits), a
 * serially assigned value (4 digits) and a single check digit.
 *
 * Source
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Korea-TIN.pdf
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'South Korean Business Registration Number',
  localName: '사업자 등록 번호',
  abbreviation: 'BRN',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 3, 5).join('-');
  },

  /**
   * BRN (사업자 등록 번호, South Korea Business Registration Number).
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [head, mid, end, check] = strings.splitAt(value, 3, 5, 9);

    if (parseInt(head, 10) < 101) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (mid === '00') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (end === '0000') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = weightedSum(value.substr(0, 9), {
      modulus: 10,
      weights: [1, 3, 7, 1, 3, 7, 1, 3, 5],
    });
    const extra = Math.floor((parseInt(end[3], 10) * 5) / 10);
    if (String((10 - ((sum + extra) % 10)) % 10) !== check) {
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
