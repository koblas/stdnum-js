/**
 * Monégasque Passport Number (Passeport monégasque).
 *
 * Format: Project uses two letters followed by six digits; no authoritative source found documenting the exact letter/digit composition of the human-entered Monegasque passport number.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Mon%C3%A9gasque_passport
 *   https://www.consilium.europa.eu/prado/en/MCO-AO-01001/index.html
 *   https://www.passportindex.org/passport/monaco/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}\d{6}$/;

const impl: Validator = {
  name: 'Monégasque Passport Number',
  localName: 'Passeport monégasque',
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
