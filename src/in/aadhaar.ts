/**
 * Aadhaar (Indian digital resident personal identity number)
 *
 * Aadhaar is a 12 digit unique identity number issued to all Indian residents.
 * The number is assigned by the Unique Identification Authority of India
 * (UIDAI).
 *
 * Source
 *    https://en.wikipedia.org/wiki/Aadhaar
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { verhoeffValidate } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 4, 8).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (value[0] === '0' || value[0] === '1') {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!verhoeffValidate(value)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isEntity: true,
    };
  },
};

export const { name, localizedName, validate, format, compact } = impl;
