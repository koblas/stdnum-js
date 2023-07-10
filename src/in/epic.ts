/**
 * EPIC (Electoral Photo Identity Card, Indian Voter ID).
 *
 * The Electoral Photo Identity Card (EPIC) is an identity document issued by
 * the Election Commission of India (ECI) only to the India citizens who have
 * reached the age of 18.
 *
 * Each EPIC contains an unique 10 digit alphanumeric identifier known as EPIC
 * number or Voter ID number.
 *
 * Every EPIC number begins with a Functional Unique Serial Number (FUSN), a 3
 * letter unique identifier for each Assembly Constituency. FUSN is followed by
 * a 6 digit serial number and 1 check digit of the serial number calculated
 * using Luhn algorithm.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Voter_ID_(India)
 *   https://www.kotaksecurities.com/ksweb/voter-id/serial-number-in-elctoral-roll
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const validRe = /^[A-Z]{3}[0-9]{7}$/;

const impl: Validator = {
  name: 'Electoral Photo Identity Card',
  localName: '',
  abbreviation: 'EPIC',

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
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!validRe.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [, front] = strings.splitAt(value, 3);

    if (!luhnChecksumValidate(front)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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
