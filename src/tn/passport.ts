/**
 * Tunisian Passport Number (جواز سفر تونسي).
 *
 * Format: 1 letter followed by 6 digits (7 chars), e.g. Y777777 in the PRADO specimen,
 * the same shape as the Tunisian passports on the OFAC SDN list. 1 letter followed
 * by 7 digits (8 chars) is also accepted, as documented by older sources.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Tunisian_passport
 *   https://trustdochub.com/en/product/tunisian-passport-validity/
 *   https://danskebank.fi/-/media/pdf/danske-bank/fi/en/national-identifier-list-final.pdf
 *   https://www.consilium.europa.eu/prado/en/TUN-AO-01001/index.html (specimen Y777777)
 *   https://sanctionslist.ofac.treas.gov/Home/SdnList (OFAC SDN list: format cross-check)
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{6,7}$/;

const impl: Validator = {
  name: 'Tunisian Passport Number',
  localName: 'جواز سفر تونسي',
  abbreviation: 'Passport',
  examples: ['X1234567', 'Y777777'],
  formats: ['annnnnnn', 'annnnnn'],

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

    if (value.length < 7 || value.length > 8) {
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
