/**
 * Costa Rican Passport Number (Pasaporte costarricense).
 *
 * Format: Two uppercase letters followed by six digits (per project's existing implementation and test cases). No authoritative government/ICAO/Purview source documents the Costa Rican passport number serial format; Microsoft Purview has no Costa Rica passport SIT, and Wikipedia/PRADO do not describe the serial structure.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Costa_Rican_passport
 *   https://regulaforensics.com/blog/costa-rica-id-card-processing/
 *   https://www.consilium.europa.eu/prado/en/prado-documents/cri/index.html
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
  name: 'Costa Rican Passport Number',
  localName: 'Pasaporte costarricense',
  abbreviation: 'Passport',
  examples: ['AB123456'],
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
