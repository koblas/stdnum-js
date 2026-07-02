/**
 * Norwegian Passport Number (Norsk pass).
 *
 * Format: Norwegian passport document number is commonly cited as 8 digits. Note that the Norwegian national identity number (fødselsnummer, 11 digits) is a separate value printed on the passport and is NOT the passport number. No authoritative government spec confirming the exact passport serial length was obtainable.
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

const idRegexp = /^\d{8}$/;

const impl: Validator = {
  name: 'Norwegian Passport Number',
  localName: 'Norsk pass',
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

    if (value.length !== 8) {
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
