/**
 * NIE (Número de Identificación de Extranjero, Spanish foreigner number).
 *
 * The NIE is an identification number for foreigners. It is a 9 digit number
 * where the first digit is either X, Y or Z and last digit is a checksum
 * letter.
 *
 * Sources:
 *    https://es.wikipedia.org/wiki/N%C3%BAmero_de_identidad_de_extranjero
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import * as dni from './dni';
import { Validator, ValidateReturn } from '../types';

const checkDigits = 'XYZ';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Spanish Foreign Number',
  localName: 'Número de Identificación de Extranjero',
  abbreviation: 'NIE',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 1, 8).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const [first, body, check] = strings.splitAt(value, 1, 8);

    if (
      !strings.isdigits(body) ||
      !checkDigits.includes(first) ||
      strings.isdigits(check)
    ) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (dni.calcCheckDigit(`${checkDigits.indexOf(first)}${body}`) !== check) {
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
