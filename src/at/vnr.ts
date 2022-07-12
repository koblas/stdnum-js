/**
 *
 * VNR, SVNR, VSNR (Versicherungsnummer, Austrian social security number).
 *
 * The Austian Versicherungsnummer is a personal identification number used for
 * social security. The number is 10 digits long and consists of a 3 digit
 * serial, a check digit and 6 digits that usually specify the person's birth
 * date.
 *
 * Sources:
 *   https://de.wikipedia.org/wiki/Sozialversicherungsnummer#Österreich
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactDDMMYY, strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Austrian Social Security Number',
  localName: 'Versicherungsnummer',
  abbreviation: 'VSNR',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 4).join(' ');
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
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, check, dob] = strings.splitAt(value, 3, 4);

    if (!isValidDateCompactDDMMYY(dob)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = weightedSum(`${front}${dob}`, {
      weights: [3, 7, 9, 5, 8, 4, 2, 1, 6],
      modulus: 11,
    });

    const digit = String(sum % 11);

    if (check !== digit) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: parseInt(front, 10) < 80000000,
      isCompany: front.length === 8 && parseInt(front, 10) > 80000000,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
