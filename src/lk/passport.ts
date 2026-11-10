/**
 * Sri Lankan Passport Number (ශ්රී ලංකා ගුවන් බලපත්රය).
 *
 * Format: A letter prefix followed by digits, 8 characters in total. Ordinary passports use a single-letter prefix (currently 'N', historically 'M'; the immigration site also references a 'P' series) followed by 7 digits, e.g. N1234567. Official passports use the 'OL' two-letter prefix followed by 6 digits; diplomatic passports use 'D'. The alternation covers both 1-letter+7-digit and 2-letter+6-digit forms.
 *
 * Source
 *   https://www.immigration.gov.lk/pages_e.php?id=7
 *   https://en.wikipedia.org/wiki/Sri_Lankan_passport
 *   https://www.torontoslcg.org/ottawa2/index.php?option=com_content&view=article&id=509&Itemid=106
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^(?:[A-Z]\d{7}|[A-Z]{2}\d{6})$/;

const impl: Validator = {
  name: 'Sri Lankan Passport Number',
  localName: 'ශ්රී ලංකා ගුවන් බලපත්රය',
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
