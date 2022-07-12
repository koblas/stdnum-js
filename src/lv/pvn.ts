/**
 * VN (Pievienotās vērtības nodokļa, Latvian VAT number).
 *
 * The PVN is a 11-digit number that can either be a reference to a legal
 * entity (in which case the first digit > 3) or a natural person (in which
 * case it should be the same as the personal code (personas kods)). Personal
 * codes start with 6 digits to denote the birth date in the form ddmmyy.
 *
 * Source
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYYYMMDD, strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -', 'LV');
}

const impl: Validator = {
  name: 'Latvian VAT Number',
  localName: 'Pievienotās Vērtības Nodokļa',
  abbreviation: 'PVN',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    if ('0123'.includes(value[0])) {
      return strings.splitAt(value, 6).join('-');
    }

    return strings.splitAt(value, 4, 8).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const isIndividual = '0123'.includes(value[0]);

    if (isIndividual) {
      const [dd, mm, yy, century] = strings.splitAt(value, 2, 4, 6, 7);

      if (
        !isValidDateCompactYYYYMMDD(
          `${18 + parseInt(century, 10)}${yy}${mm}${dd}`,
        )
      ) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }

      const [front, check] = strings.splitAt(value, -1);

      const sum =
        1 +
        weightedSum(front, {
          weights: [10, 5, 8, 4, 2, 1, 6, 3, 7, 9],
          modulus: 11,
        });

      if (String((sum % 11) % 10) !== check) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    } else {
      const sum = weightedSum(value, {
        weights: [9, 1, 4, 8, 3, 10, 2, 5, 7, 6, 1],
        modulus: 11,
      });

      if (sum !== 3) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    }

    return {
      isValid: true,
      compact: value,
      isIndividual,
      isCompany: !isIndividual,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
