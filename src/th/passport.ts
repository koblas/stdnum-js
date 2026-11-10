/**
 * Thai Passport Number (หนังสือเดินทางไทย).
 *
 * Format: Two letters followed by 7 digits (e.g., 'AA1234567'), totaling 9 characters, matching the ICAO MRZ document-number field for modern Thai e-passports.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Thai_passport
 *   https://www.consilium.europa.eu/prado/en/prado-documents/tha/a/docs-per-category.html
 *   https://docs.trellix.com/bundle/data-loss-prevention-11.10.x-classification-definitions-reference-guide/page/GUID-2166D96B-097D-4E5B-80E8-B2960E812767.html
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
  name: 'Thai Passport Number',
  localName: 'หนังสือเดินทางไทย',
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
