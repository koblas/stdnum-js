/**
 * CVR (Momsregistreringsnummer, Danish VAT number).
 *
 * The CVR (Momsregistreringsnummer, VAT) is an 8 digit number with a
 * straightforward check mechanism
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -');
  if (err !== null) {
    return [value, err];
  }
  if (value.startsWith('DK')) {
    return [value.substr(2), null];
  }

  return [value, null];
}

const impl: Validator = {
  name: 'Danish VAT Number',
  localName: 'Momsregistreringsnummer',
  abbreviation: 'CVR',

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
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, -1);

    const sum = weightedSum(front, {
      modulus: 11,
      weights: [2, 7, 6, 5, 4, 3, 2, 1],
    });
    if (String((11 - sum) % 10) !== check) {
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
