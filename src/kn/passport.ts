/**
 * Kittitian and Nevisian Passport Number (Saint Kitts and Nevis passport).
 *
 * Format: Saint Kitts and Nevis passport number: one or two letters followed by six or seven digits (e.g. RE1234567, RE123456).
 *
 * Source
 *   https://sanctionslist.ofac.treas.gov/Home/SdnList (OFAC SDN list: format cross-check)
 *   https://en.wikipedia.org/wiki/Saint_Kitts_and_Nevis_passport
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/SaintKittsandNevis.html
 *   https://www.passportindex.org/passport/saint-kitts-and-nevis/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{1,2}\d{6,7}$/;

const impl: Validator = {
  name: 'Kittitian and Nevisian Passport Number',
  localName: 'Saint Kitts and Nevis passport',
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

    if (value.length < 7 || value.length > 9) {
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
