/**
 * Bosnian Passport Number (Bosanski pasoš).
 *
 * Format: Nine alphanumeric characters. Modern biometric passports use a single letter prefix followed by eight digits; older forms appear as nine digits.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Bosnia_and_Herzegovina_passport
 *   https://www.iddeea.gov.ba/en/elementor-56420/
 *   https://www.consilium.europa.eu/prado/en/BIH-AO-02001/index.html
 *   https://danskebank.fi/-/media/pdf/danske-bank/fi/en/national-identifier-list-final.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{8}$|^\d{9}$/;

const impl: Validator = {
  name: 'Bosnian Passport Number',
  localName: 'Bosanski pasoš',
  abbreviation: 'Passport',
  examples: ['A12345678', '123456789'],
  formats: ['cnnnnnnnn'],

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
