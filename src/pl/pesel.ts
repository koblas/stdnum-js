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
  name: 'Polish National Identification Number',
  localName: 'Powszechny Elektroniczny System Ewidencji Ludności',
  abbreviation: 'PESEL',
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
    const month = parseInt(mm, 10);

    let century;
    if (month >= 80) {
      century = '18';
    } else if (month >= 60) {
      century = '22';
    } else if (month >= 40) {
      century = '21';
    } else if (month >= 20) {
      century = '20';
    } else {
      century = '19';
    }

    if (!isValidDate(`${century}${yy}`, String(month % 20), dd)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, check] = strings.splitAt(value, -1);

    const sum = weightedSum(front, {
      weights: [1, 3, 7, 9, 1, 3, 7, 9, 1, 3],
      modulus: 10,
    });

    if (String((10 - sum) % 10) !== check) {
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
