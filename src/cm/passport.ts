/**
 * Cameroonian Passport Number (Passeport camerounais).
 *
 * Format: Cameroon biometric passport. Multiple ID-processing/MRZ references describe the document number as 9 alphanumeric characters (letters A-Z and digits), consistent with the ICAO MRP 9-character document-number field. Older numbers were often all-numeric, but the field is alphanumeric.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Cameroonian_passport
 *   https://regulaforensics.com/blog/cameroonian-passport-processing/
 *   https://www.refworld.org/docid/440ed6e7a.html
 *   https://trustdochub.com/en/product/cameroonian-passport-validity/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z0-9]{9}$/;

const impl: Validator = {
  name: 'Cameroonian Passport Number',
  localName: 'Passeport camerounais',
  abbreviation: 'PASSPORT',
  examples: ['123456789', 'PA1234567'],
  formats: ['ccccccccc'],

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
