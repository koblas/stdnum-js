/**
 * Georgian Passport Number (საქართველოს პასპორტი).
 *
 * Format: Numeric passport serial, approximately 8-9 digits (exact modern format not authoritatively confirmed).
 *
 * Source
 *   https://en.wikipedia.org/wiki/Georgian_passport
 *   https://www.ecoi.net/en/document/1207477.html
 *   https://www.consilium.europa.eu/prado/en/prado-documents/geo/a/docs-per-category.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{8}[A-Z0-9]?$/;

const impl: Validator = {
  name: 'Georgian Passport Number',
  localName: 'საქართველოს პასპორტი',
  abbreviation: 'PASSPORT',

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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
