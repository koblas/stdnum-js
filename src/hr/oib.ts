/**
 * OIB (Osobni identifikacijski broj, Croatian identification number).
 *
 * The personal identification number is used to identify persons and legal
 * entities in Croatia. It has 11 digits (sometimes prefixed by HR), contains
 * no personal information and uses the ISO 7064 Mod 11, 10 checksum algorithm.
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { iso7064mod10x11validate } from '../util/iso7064';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -', 'HR');
}

const impl: Validator = {
  name: 'Croatian Personal Identification Number',
  localName: 'Osobni Identifikacijski Broj',
  abbreviation: 'OIB',
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

    if (!iso7064mod10x11validate(value)) {
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
