/**
 * PESEL (Polish national identification number).
 *
 * The Powszechny Elektroniczny System Ewidencji Ludności (PESEL, Universal
 * Electronic System for Registration of the Population) is a 11-digit Polish
 * national identification number. The number consists of the date of birth,
 * a serial number, the person's gender and a check digit.
 *
 * Source
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDate, strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
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
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [yy, mm, dd] = strings.splitAt(value, 2, 4, 6);
    const day = parseInt(dd, 10);

    let century;
    if (day >= 80) {
      century = '18';
    } else if (day >= 60) {
      century = '22';
    } else if (day >= 40) {
      century = '21';
    } else if (day >= 20) {
      century = '20';
    } else {
      century = '19';
    }

    if (!isValidDate(`${century}${yy}`, mm, String(day % 20))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, check] = strings.splitAt(value, -1);

    const sum = weightedSum(front, {
      weights: [1, 3, 7, 9, 1, 3, 7, 9, 1, 3],
      modulus: 10,
    });

    if (String(10 - sum) !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isEntity: false,
    };
  },
};

export const { name, localizedName, validate, format, compact } = impl;
