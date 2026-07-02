/**
 * Mozambican Passport Number (Passaporte moçambicano).
 *
 * Format: Modern Mozambican machine-readable passports use two letters followed by seven digits (e.g. AB1234567). The project's current regex used only six digits, which appears too short for current MRP-era passports; the 2-letter + 7-digit pattern is the commonly observed serial. Authoritative confirmation was not obtainable (PRADO page returned 403), so this is not firmly verified.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Mozambican_passport
 *   https://www.consilium.europa.eu/prado/en/MOZ-AO-02001/index.html
 *   https://www.icao.int/Meetings/AMC/MRTD-SEMINAR-2010-AFRICA/Documentation/9_MozambiqueImmigration2.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}\d{7}$/;

const impl: Validator = {
  name: 'Mozambican Passport Number',
  localName: 'Passaporte moçambicano',
  abbreviation: 'Passport',

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

    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const match = value.match(idRegexp);
    if (!match) {
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
