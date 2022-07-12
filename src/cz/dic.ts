/**
 * DIČ (Daňové identifikační číslo, Czech VAT number).
 *
 * The number is an 8, 9 or 10 digit code that includes a check digit and is
 * used to uniquely identify taxpayers for VAT (DPH in Czech). The number can
 * refer to legal entities (8 digit numbers), individuals with a RČ (the 9 or
 * 10 digit Czech birth number) or individuals without a RČ (9 digit numbers
 * that begin with a 6).
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';
import { validate as rcValidate } from './rc';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -');
  if (err !== null) {
    return [value, err];
  }
  if (value.startsWith('CZ')) {
    return [value.substr(2), null];
  }

  return [value, null];
}

function checkLegal(value: string): boolean {
  const [front, check] = strings.splitAt(value, -1);

  const sum = weightedSum(front, {
    modulus: 11,
    weights: [8, 7, 6, 5, 4, 3, 2, 1],
  });

  const v = (11 - sum) % 11;

  return (v === 0 ? '1' : String(v % 10)) === check;
}

function checkSpecial(value: string): boolean {
  // check = sum((8 - i) * int(n) for i, n in enumerate(number)) % 11

  // return str((8 - (10 - check) % 11) % 10)

  const [front, check] = strings.splitAt(value, -1);

  const sum = weightedSum(front, {
    modulus: 11,
    weights: [8, 7, 6, 5, 4, 3, 2, 1],
  });
  const digit = String((8 - ((10 - sum) % 11)) % 10);

  return digit === check;
}

const impl: Validator = {
  name: 'Czech VAT Number',
  localName: 'Daňové identifikační číslo',
  abbreviation: 'DIČ',

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
    if (![8, 9, 10].includes(value.length)) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value.length === 8) {
      if (value.startsWith('9')) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }

      if (!checkLegal(value)) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }

      return {
        isValid: true,
        compact: value,
        isIndividual: false,
        isCompany: true,
      };
    }
    if (value.length === 9 && value.startsWith('6')) {
      if (!checkSpecial(value)) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }

      return {
        isValid: true,
        compact: value,
        isIndividual: false,
        isCompany: true,
      };
    }

    return rcValidate(value);
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
