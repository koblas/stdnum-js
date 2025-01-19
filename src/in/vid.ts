/**
 * VID (Indian personal virtual identity number).
 *
 * VID is a temporary, revocable 16-digit random number mapped with the Aadhaar number.
 * VID is used in lieu of Aadhaar number whenever authentication or e-KYC services
 * are performed.
 * VID is made up of 16 digits where the last digits is a check digit
 * calculated using the Verhoeff algorithm. The numbers are generated in a
 * random, non-repeating sequence and do not begin with 0 or 1.
 *
 * Source:
 *   https://uidai.gov.in/en/contact-support/have-any-question/284-faqs/aadhaar-online-services/virtual-id-vid.html
 *   https://uidai.gov.in/images/resource/UIDAI_Circular_11012018.pdf
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

// Regular expression used to check syntax of VID numbers.
const validRE = /^[2-9][0-9]{15}$/;

const impl: Validator = {
  name: 'Indian personal virtual identity number',
  localName: 'Indian personal virtual identity number',
  abbreviation: 'VIN',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 4, 8, 12).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 16) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!validRE.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    // Value cannot be a palindrome
    const r = value.split('');
    r.reverse();
    if (value === r.join('')) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    // checksum check
    if (!verhoeffValidate(value)) {
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
