/**
 * ID za DDV (Davčna številka, Slovenian VAT number).
 *
 * The DDV number (Davčna številka) is used for VAT (DDV, Davek na dodano
 * vrednost) purposes and consist of 8 digits of which the last is a check
 * digit.
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -', 'SI');
}

const impl: Validator = {
  name: 'Slovenian VAT Number',
  localName: 'Identifikacijska številka za DDV',
  abbreviation: 'ID za DDV',
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
    if (value.length !== 8) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, -1);

    const sum =
      11 -
      weightedSum(front, {
        weights: [8, 7, 6, 5, 4, 3, 2, 1],
        modulus: 11,
      });

    if (String(sum % 10) !== check) {
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
