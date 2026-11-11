/**
 * IČ DPH (IČ pre daň z pridanej hodnoty, Slovak VAT number).
 *
 * The IČ DPH (Identifikačné číslo pre daň z pridanej hodnoty) is a 10-digit
 * number used for VAT purposes. It has a straightforward checksum: the number
 * is divisible by 11. The first digit is not 0 and the third digit is one of
 * 2, 3, 4, 7, 8 or 9.
 *
 * Source
 *   https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/sk/dph.py
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -', 'SK');
}

const impl: Validator = {
  name: 'Slovak VAT Number',
  localName: 'Identifikačné Číslo pre Daň z Pridanej Hodnoty',
  abbreviation: 'IČ DPH',
  examples: ['2022749619'],
  formats: ['nnn nnn nn nn'],
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 3, 6, 8).join(' ');
  },

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

    // The first digit is not 0 and the third is one of 2, 3, 4, 7, 8, 9
    if (value[0] === '0' || !'234789'.includes(value[2])) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (parseInt(value, 10) % 11 !== 0) {
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

export const {
  name,
  localName,
  abbreviation,
  examples,
  formats,
  validate,
  format,
  compact,
} = impl;
