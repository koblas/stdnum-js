/**
 * PPS No (Personal Public Service Number, Irish personal number).
 *
 * The Personal Public Service number consists of 7 digits, and one or
 * two letters. The first letter is a check character.
 * When present (which should be the case for new numbers as of 2013),
 * the second letter can be 'A' (for individuals) or 'H' (for
 * non-individuals, such as limited companies, trusts, partnerships
 * and unincorporated bodies). Pre-2013 values may have 'W', 'T',
 * or 'X' as the second letter ; it is ignored by the check.
 *
 * Source
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { calcCheckDigit } from './vat';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const ppsRe = /^\d{7}[A-W][AHWTX]?$/;

const impl: Validator = {
  name: 'Irish Personal Number',
  localName: 'Personal Public Service Number',
  abbreviation: 'PPS',
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
    if (value.length !== 8 && value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!ppsRe.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value.length === 9 && 'AH'.includes(value[8])) {
      if (
        value[7] !== calcCheckDigit(`${value.substr(0, 7)}${value.substr(8)}`)
      ) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    } else if (value[7] !== calcCheckDigit(value.substr(0, 7))) {
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
