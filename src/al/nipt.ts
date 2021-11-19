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
import { strings } from '../util';

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
    if (!/^[JKL]\d{8}[A-Z]$/.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isEntity: true,
    };
  },
};
export const {
  name,
  localName,
  abbreviation,
  validate,
  format,
  compact,
} = impl;
