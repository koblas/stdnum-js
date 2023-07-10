/**
 * Aadhaar (Indian digital resident personal identity number)
 *
 * Aadhaar is a 12 digit identification number that can be obtained by Indian
 * citizens, non-residents passport holders of India and resident foreign
 * nationals. The number is issued by the Unique Identification Authority of
 * India (UIDAI).
 *
 * Aadhaar is made up of 12 digits where the last digits is a check digit
 * calculated using the Verhoeff algorithm. The numbers are generated in a
 * random, non-repeating sequence and do not begin with 0 or 1.
 *
 * Aadhaar is a 12 digit unique identity number issued to all Indian residents.
 * The number is assigned by the Unique Identification Authority of India
 * (UIDAI).
 *
 * Source
 *   https://web.archive.org/web/20140611025606/http://uidai.gov.in/UID_PDF/Working_Papers/A_UID_Numbering_Scheme.pdf
 *   https://en.wikipedia.org/wiki/Aadhaar
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
  name: 'Indian Digital Resident Personal Identity Number',
  localName: 'Aadhaar',
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
    if (value.split('').reverse().join('') === value) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

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
