/**
 * BI (Bilhete de Identidade, Angola Identity Card).
 *
 * The Angolan BI is a national identification document.
 * The number consists of 14 characters:
 * - 9 digits
 * - 2 letters
 * - 3 digits
 *
 * Example: 000204688CA010
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input.toUpperCase(), ' -.');
}

const BIO_REGEX = /^\d{9}[A-Z]{2}\d{3}$/;

const impl: Validator = {
  name: 'Angola Identity Card',
  localName: 'Bilhete de Identidade',
  abbreviation: 'BI',

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
    if (value.length !== 14) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!BIO_REGEX.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
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
