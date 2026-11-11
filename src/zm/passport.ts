/**
 * Zambian Passport Number (Zambian passport).
 *
 * Format: Two letters followed by 6 digits. Wikipedia's passport infobox gives the sample format 'ZN000000' (ZN + 6 digits).
 *
 * Source
 *   https://en.wikipedia.org/wiki/Zambian_passport
 *   https://www.consilium.europa.eu/prado/en/ZMB-AD-01001/index.html
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
  name: 'Zambian Passport Number',
  localName: 'Zambian passport',
  abbreviation: 'PASSPORT',
  examples: ['ZN123456'],
  formats: ['aannnnnn'],

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
