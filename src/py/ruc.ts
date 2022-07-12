/**
 *
 * Paraguay RUC numbers
 *
 * RUC number (Registro Único del Contribuyentes, Paraguay tax number).
 *
 * The Registro Único del Contribuyente (RUC) is the unique taxpayer registry
 * that maintains identification numbers for all persons (national or foreign)
 * and legal entities in Paraguay.
 *
 * The RUC number for legal entities consists of 8 digits starting after
 * 80000000. Number for residents and foreigners are up to 9 digits. The last
 * digit is a check digit.
 *
 * Sources:
 *   https://www.ruc.com.py/
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Paraguay Tax Number',
  localName: 'Registro Único del Contribuyentes',
  abbreviation: 'RUC',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return `${value.substr(0, value.length - 1)}-${value.substr(
      value.length - 1,
    )}`;
  },

  /**
   * Check if the number is a valid RUC.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length < 5 || value.length > 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, check] = strings.splitAt(value, value.length - 1);

    const sum = front
      .split('')
      .reverse()
      .map(x => parseInt(x, 10))
      .reduce((acc, digit, idx) => acc + digit * (idx + 2), 0);

    const digit = String((11 - (sum % 11)) % 10);

    if (check !== digit) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: parseInt(front, 10) < 80000000,
      isCompany: front.length === 8 && parseInt(front, 10) > 80000000,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
