/**
 * FIN (Fayda Identification Number).
 *
 * Source
 *   https://en.wikipedia.org/wiki/Fayda_ID
 *   https://id.gov.et/
 *   https://www.ethiotelecom.et/national-id/
 *   https://help.unhcr.org/ethiopia/services/documentation/proof-of-registration-and-refugee-id/
 *   https://www.worldbank.org/en/news/feature/2025/02/27/the-transformative-power-of-ethiopia-afe-digital-id-unlocking-a-better-future-for-all
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{12}$/;

const impl: Validator = {
  name: 'Fayda Identification Number',
  localName: 'ፋይዳ',
  abbreviation: 'FIN',
  examples: ['123456789012'],
  formats: ['nnnnnnnnnnnn'],

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

    if (value.length !== 12) {
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
