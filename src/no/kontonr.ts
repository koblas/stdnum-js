/**
 *  Konto nr. (Bank Account Number) IBAN?
 *
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate, weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -.');

  if (err) {
    return [value, err];
  }

  if (value.startsWith('0000')) {
    return [value.substr(4), null];
  }

  return [value, null];
}

const impl: Validator = {
  name: 'Norwegian Bank Account Number',
  localName: 'Kontonummer',
  abbreviation: 'Konto Nr.',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value.padStart(11, '0'), 4, 6).join('.');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 11 && value.length !== 7) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value.length === 7 && !luhnChecksumValidate(value)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }
    if (value.length === 11) {
      const [front, check] = strings.splitAt(value, -1);

      const sum = weightedSum(front, {
        weights: [6, 7, 8, 9, 4, 5, 6, 7, 8, 9],
        modulus: 11,
      });

      if (String(sum) !== check) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
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
