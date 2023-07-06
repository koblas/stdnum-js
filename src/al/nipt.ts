/**
 *
 * NIPT (Numri i Identifikimit për Personin e Tatueshëm, Albanian VAT number)
 *
 * The Albanian NIPT is a 10-digit number with the first and last character
 * being letters.
 *
 * Sources:
 *
 * https://en.wikipedia.org/wiki/VAT_identification_number
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { ValidateReturn, Validator } from '../types';
import { strings, isValidDate } from '../util';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  // eslint-disable-next-line prefer-const
  let [value, err] = strings.cleanUnicode(input, ' ');

  if (err) {
    return [value, err];
  }

  if (value.startsWith('AL')) {
    value = value.substring(2);
  } else if (value.startsWith('(AL)')) {
    value = value.substring(4);
  }

  return [value, null];
}

const impl: Validator = {
  name: 'Albanian VAT Number',
  localName: 'Numri i Identifikimit për Personin e Tatueshëm',
  abbreviation: 'NIPT',

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

  /**
   * Check if the number is a valid Albanian NIPT number.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!/^[A-M]\d{8}[A-Z]$/.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    const [ccode, ydigit, monthDistrict, day, , check] = strings.splitAt(
      value,
      1,
      2,
      4,
      6,
      9,
    );
    const month = ((parseInt(monthDistrict, 10) - 1) % 12) + 1;
    const yearVal = ccode.charCodeAt(0) - 65;
    const year = 1900 + yearVal * 10 + parseInt(ydigit, 10);
    if (!isValidDate(String(year), String(month), day)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!/^[A-Z]$/.test(check)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    // TODO: check calculation is not understood
    // const sumValue = `${yearVal}${value.substring(1, 9)}`;
    // const checkValue = check.charCodeAt(0) - 65;

    // const sum = weightedSum(sumValue, { weights: [1], modulus: 26 });
    // console.log(value, sumValue, sum, checkValue);
    // if (sum !== checkValue) {
    //   return { isValid: false, error: new exceptions.InvalidChecksum() };
    // }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: true,
    };
  },
};
export const { name, localName, abbreviation, validate, format, compact } =
  impl;
