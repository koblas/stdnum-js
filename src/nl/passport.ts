/**
 * Dutch Passport Number (Nederlands paspoort).
 *
 * Format: Dutch passport/ID document number is 9 characters: positions 1-2 are letters, positions 3-8 are letters or digits, position 9 is a digit (e.g. AB1234567 or SPECIM01). The letter 'O' is not used (to avoid confusion with 0), but [A-Z] is retained for simplicity. Microsoft Purview describes it generically as 'nine letters or digits'.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-netherlands-passport-number
 *   https://www.rvig.nl/sites/default/files/2025-05/Kenmerkenbrochure%20Nederlands%20paspoort%20model%202021%20EN.pdf
 *   https://en.wikipedia.org/wiki/Dutch_passport
 *   https://www.government.nl/faq/how-do-i-know-if-my-passport-number-includes-a-number-0-or-a-letter-o
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}[A-Z0-9]{6}\d$/;

const impl: Validator = {
  name: 'Dutch Passport Number',
  localName: 'Nederlands paspoort',
  abbreviation: 'Passport',
  examples: ['AB1234567', 'NXKC8H3K9'],
  formats: ['aaccccccn'],

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
