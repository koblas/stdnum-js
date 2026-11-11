/**
 * Luxembourgish Passport Number (Lëtzebuerger Pass).
 *
 * Format: Seven or eight alphanumeric characters (letters and/or digits), no spaces or delimiters.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-luxemburg-passport-number
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

const idRegexp = /^[A-Z0-9]{7,8}$/;

const impl: Validator = {
  name: 'Luxembourgish Passport Number',
  localName: 'Lëtzebuerger Pass',
  abbreviation: 'Passport',
  examples: ['JC4E7L2H', 'AB123456'],
  formats: ['cccccccc', 'ccccccc'],

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
