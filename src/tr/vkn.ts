/**
 * VKN (Vergi Kimlik Numarası, Turkish tax identification number).
 *
 * The Vergi Kimlik Numarası is the Turkish tax identification number used for
 * businesses. The number consists of 10 digits where the first digit is derived
 * from the company name.
 *
 * Source:
 *    https://www.turkiye.gov.tr/gib-intvrg-vergi-kimlik-numarasi-dogrulama
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, '');
}

const impl: Validator = {
  name: 'Turkish Tax Identification Number',
  localName: 'Vergi Kimlik Numarası',
  abbreviation: 'VKN',
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
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, -1);

    const sum = front
      .split('')
      .map((v, i) => (parseInt(v, 10) + 9 - i) % 10)
      .map((v, i) => {
        if (v === 0) {
          return v;
        }

        return (v * 2 ** (9 - i)) % 9 || 9;
      })
      .reduce((acc, v) => (acc + v) % 10);

    // (acc, v, idx) => acc + (v === 9 ? v : (v * 2 ** (9 - idx)) % 9),
    // 10,
    // );

    if (String((10 - sum) % 10) !== check) {
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
