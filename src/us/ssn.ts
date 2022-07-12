/**
 * SSN (U.S. Social Security Number).
 *
 * The Social Security Number is used to identify individuals for taxation
 * purposes. It is a 9-digit number that consists of a 3-digit area number, a
 * 2-digit group number and a 4-digit serial number. The number does not use a
 * check digit.
 *
 * Sources:
 *    https://en.wikipedia.org/wiki/Social_Security_number
 *    https://www.ssa.gov/employer/verifySSN.htm
 *
 * INDIVIDUAL
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

const invalidSSN = [
  '111111111',
  '222222222',
  '333333333',
  '444444444',
  '555555555',
  '777777777',
  '888888888',
  '999999999',
  '123123123',
  '999999999',
  // Used in Advertising and known "invalid"
  '002281852',
  '042103580',
  '062360749',
  '078051120',
  '095073645',
  '128036045',
  '135016629',
  '141186941',
  '165167999',
  '165187999',
  '165207999',
  '165227999',
  '165247999',
  '189092294',
  '212097694',
  '212099999',
  '219099999',
  '306302348',
  '308125070',
  '457555462',
  '468288779',
  '549241889',
];

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, '- ');
}

const impl: Validator = {
  name: 'U.S. Social Security Number',
  localName: 'Social Security Number',
  abbreviation: 'SSN',
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
   * Check if the number is a valid SSN number.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (invalidSSN.includes(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (/^(000|666|9)\d+/.test(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (/^\d{3}00\d{4}/.test(value)) {
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
