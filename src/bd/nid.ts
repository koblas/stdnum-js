/**
 * NID (National Identity Card Number).
 *
 * Source
 *   https://en.wikipedia.org/wiki/National_identity_card_(Bangladesh)
 *   https://en.wikipedia.org/wiki/National_identification_number
 *   https://bdnews24.com/bangladesh/election-commission-decides-on-10-digit-smart-nid-cards-for-bangladesh-nationals
 *   https://www.nidw.gov.bd/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^(\d{10}|\d{13}|\d{17})$/;

const impl: Validator = {
  name: 'National Identity Card Number',
  localName: 'জাতীয় পরিচয়পত্র (Jatiya Porichoypatra)',
  abbreviation: 'NID',
  examples: ['1234567890', '1990123456789', '19901234567890123'],
  formats: ['nnnnnnnnnn', 'nnnnnnnnnnnnn', 'nnnnnnnnnnnnnnnnn'],

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

    if (value.length < 10 || value.length > 17) {
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
