/**
 * VAT (Moms, Mervärdesskatt, Swedish VAT number).
 *
 * The Momsregistreringsnummer is used for VAT (Moms, Mervärdesskatt) purposes
 * and consists of 12 digits of which the last two should be 01. The first 10
 * digits should have a valid Luhn checksum.
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.', 'SE');
}

const impl: Validator = {
  name: 'Swedish VAT Number',
  localName: 'Momsregistreringsnummer',
  abbreviation: 'Momsnr.',
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
    if (value.length !== 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, end] = strings.splitAt(value, -2);

    if (end !== '01') {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!luhnChecksumValidate(front)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
