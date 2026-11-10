/**
 * Chilean Passport Number (Pasaporte chileno).
 *
 * Format: Chilean passport. Historically (until 2013) the passport number equaled the RUN national ID: 7-8 digits plus a check digit (0-9 or K). Modern biometric passports (since 2013) are commonly seen as an optional letter prefix followed by digits. No authoritative source publishes an exact fixed pattern, so the regex is permissive: an optional leading letter, 6-9 digits, optional trailing check char.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Chilean_passport
 *   https://en.wikipedia.org/wiki/Unique_National_Role
 *   https://regulaforensics.com/blog/chile-id-card-processing/
 *   https://www.consilium.europa.eu/prado/en/CHL-AS-01001/index.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]?\d{6,9}[0-9K]?$/;

const impl: Validator = {
  name: 'Chilean Passport Number',
  localName: 'Pasaporte chileno',
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

    if (value.length < 6 || value.length > 11) {
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
