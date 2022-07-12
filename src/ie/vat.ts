/**
 * VAT (Irish tax reference number).
 *
 * The Irish VAT number consists of 8 or 9 digits. The number is either 7 digits
 * and 1 letter (optionally followed by a W for married women), 7 digits and 2
 * letters, or 6 digits and 2 letters or symbols (in second and last position).
 *
 * Source
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ', 'IE');
}

const ALPHABET = 'WABCDEFGHIJKLMNOPQRSTUV';

export function calcCheckDigit(valueIn: string): string {
  const value = valueIn.padStart(7, '0');
  const d1 = value
    .substr(0, 7)
    .split('')
    .reduce((acc, vv, idx) => {
      const v = Number.parseInt(vv, 10);

      return acc + (8 - idx) * v;
    }, 0);

  const d2 = value.length === 8 ? 9 * ALPHABET.indexOf(value[7]) : 0;

  return ALPHABET[(d1 + d2) % 23];
}

const impl: Validator = {
  name: 'Irish VAT Number',
  localName: 'Cáin Bhreisluacha',
  abbreviation: 'CBL',
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
    if (!strings.isdigits(value[0]) || !strings.isdigits(value.substr(2, 5))) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    const [front, end] = strings.splitAt(value, 7);
    if (!end.split('').every(v => ALPHABET.includes(v))) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (strings.isdigits(front)) {
      // 7 digits followed by 1 or 2 letters
      if (value[7] !== calcCheckDigit(`${front}${value.substr(8)}`)) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    } else if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ+*'.includes(value[1])) {
      // old system, second character is number
      if (value[7] !== calcCheckDigit(`${value.substr(2, 5)}${value[0]}`)) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    } else {
      return { isValid: false, error: new exceptions.InvalidFormat() };
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
