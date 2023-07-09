/**
 * PIN (Personal Identification Number, Kenya tax number).
 *
 * The Personal Identification Number (KRA PIN) is an 11 digit unique number that
 * is issued by Kenya Revenue Authority (KRA) for purposes of transacting business
 * with KRA, other Government agencies and service providers. It can be issued for
 * individuals and non-individuals like companies, schools, organisations, etc.
 *
 * The number consists of 11 characters, where the first one is an A (for
 * individuals) or a P (for non-individuals), the last one is a letter, and the
 * rest are digits.
 *
 * DESCRIPTION
 *
 * Source
 *   https://www.kra.go.ke/individual/individual-pin-registration/learn-about-pin/about-pin
 *   https://itax.kra.go.ke/KRA-Portal/pinChecker.htm
 *
 * ENTITY/PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const validRe = /^[A|P]{1}[0-9]{9}[A-Z]{1}$/i;

const impl: Validator = {
  name: 'Personal Identification Number',
  localName: '',
  abbreviation: 'PIN',

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
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!validRe.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: value[0] === 'A',
      isCompany: value[0] === 'P',
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
