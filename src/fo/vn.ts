/**
 * V-number (Vinnutal, Faroe Islands tax number).
 *
 * In the Faroe Islands the legal persons TIN equals the V number issued by the
 * Faroese Tax Administration. It is a consecutive number.
 *
 * Source
 *   https://www.taks.fo/fo/borgari/bolkar/at-stovna-virki/
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Faroe-islands-TIN.pdf
 *
 * ENTITY/PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

// const validRe = /^[PCGQV]{1}00[A-Z0-9]{8}$/;

// const ALPHABET = '0123456789X';

const impl: Validator = {
  name: 'Vinnutal',
  localName: 'NAME',
  abbreviation: 'VN',

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
    if (value.length !== 6) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
