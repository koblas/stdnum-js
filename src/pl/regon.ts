/**
 * REGON (Rejestr Gospodarki Narodowej, Polish register of economic units).
 *
 * The REGON (Rejestr Gospodarki Narodowej) is a statistical identification
 * number for businesses. National entities are assigned a 9-digit number, while
 * local units append 5 digits to form a 14-digit number.
 *
 * Source:
 *    https://bip.stat.gov.pl/en/regon/
 *    https://wyszukiwarkaregon.stat.gov.pl/appBIR/index.aspx
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Polish Statistical Identificaiton Number',
  localName: 'Rejestr Gospodarki Narodowej',
  abbreviation: 'REGON',

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
    if (value.length !== 9 && value.length !== 14) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check, , check2] = strings.splitAt(value, 8, 9, -1);
    const sum = weightedSum(front, {
      weights: [8, 9, 2, 3, 4, 5, 6, 7],
      modulus: 11,
    });

    if (String(sum % 10) !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    if (value.length === 14) {
      const sum2 = weightedSum(value.substring(0, 13), {
        weights: [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8],
        modulus: 11,
      });
      if (String(sum2 % 10) !== check2) {
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
