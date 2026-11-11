/**
 * Cambodian Passport Number (លិខណៈកម្មដេកល្ខ).
 *
 * Format: One uppercase letter (commonly 'N') followed by 7 or 8 digits (e.g. N1234567, N12345678). Total length 8-9 characters.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Cambodian_passport
 *   https://www.embassyofcambodiadc.org/cambodia-sample-doc.html
 *   https://www.microfocus.com/documentation/idol/IDOL_24_3/EductionGrammars_24.3_Documentation/PII/Content/PII/PII_Examples_Passport.htm
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{7,8}$/;

const impl: Validator = {
  name: 'Cambodian Passport Number',
  localName: 'លិខណៈកម្មដេកល្ខ',
  abbreviation: 'PASSPORT',
  examples: ['N1234567', 'N12345678'],
  formats: ['annnnnnn', 'annnnnnnn'],

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

    if (value.length < 8 || value.length > 9) {
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
