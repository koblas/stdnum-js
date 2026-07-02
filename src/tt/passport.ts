/**
 * Trinidadian and Tobagonian Passport Number (Trinidad and Tobago passport).
 *
 * Format: Two uppercase letters followed by six digits (e.g. TA123456). This is the machine-readable passport (MRP) number introduced in 2007.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Trinidad_and_Tobago_passport
 *   https://foreign.gov.tt/documents/168/machine-readable-passport-brochure.pdf
 *   https://knowledge.broadcom.com/external/article/159954/detect-passport-numbers-for-one-or-more.html
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
  name: 'Trinidadian and Tobagonian Passport Number',
  localName: 'Trinidad and Tobago passport',
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
