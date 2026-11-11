/**
 * Norwegian Passport Number (Norsk pass).
 *
 * Format: Norwegian passport number. Passports issued since 19 October 2020 start with a letter (C ordinary, K emergency, FG diplomatic, FH service, FJ special, FL aliens, FK travel document) followed by letters or digits; older passports use eight digits. The exact length after the prefix is not published, so 8 or 9 characters are accepted.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Norwegian_passport
 *   https://www.consilium.europa.eu/prado/en/NOR-AO-03001/index.html
 *   https://www.politiet.no/globalassets/tjenester-admin/pass-og-id-kort/control-guide-norwegian-passports-oct-19-2020.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^(?:\d{8}|[A-Z][A-Z0-9]{7,8})$/;

const impl: Validator = {
  name: 'Norwegian Passport Number',
  localName: 'Norsk pass',
  abbreviation: 'Passport',
  examples: ['12345678', 'C1234567'],
  formats: ['cccccccc', 'acccccccc'],

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
