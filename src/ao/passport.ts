/**
 * Angolan Passport Number (Passaporte angolano).
 *
 * Format: Angolan passport number: two letters followed by seven digits for the e-passport issued since 16 December 2025 (Lei n.º 1/26, art. 5.º); previous passports use a type letter (N ordinary, D diplomatic, S service, E foreign nationals) followed by seven digits (e.g. N1234567).
 *
 * Source
 *   https://lex.ao/docs/assembleia-nacional/2026/lei-n-o-1-26-de-02-de-marco/
 *   https://www.consilium.europa.eu/prado/en/AGO-AO-01001/index.html
 *   https://www.consilium.europa.eu/prado/en/prado-documents/ago/a/docs-per-category.html
 *   https://en.wikipedia.org/wiki/Angolan_passport
 *   https://www.ecoi.net/en/document/2095422.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{1,2}\d{7}$/;

const impl: Validator = {
  name: 'Angolan Passport Number',
  localName: 'Passaporte angolano',
  abbreviation: 'Passport',
  examples: ['N1234567', 'NA1234567'],
  formats: ['annnnnnn', 'aannnnnnn'],

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

    if (value.length < 8 || value.length > 9) {
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

export const {
  name,
  localName,
  abbreviation,
  examples,
  formats,
  validate,
  format,
  compact,
} = impl;
