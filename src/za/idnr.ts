/**
 * ID number (South African Identity Document number).
 *
 * The South African ID number is issued to individuals within South Africa. The
 * number consists of 13 digits and contains information about a person's date
 * of birth, gender and whether the person is a citizen or permanent resident.
 *
 * Source
 *   https://en.wikipedia.org/wiki/South_African_identity_card
 *   http://www.dha.gov.za/index.php/identity-documents2
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { isValidDateCompactYYMMDD } from '../util/isValidDate';
import { luhnChecksumValidate } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'South African Identity Document Number',
  localName: 'Identity Document Number',
  abbreviation: 'IDNR',
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
    if (value.length !== 13) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [bdate, gender, , citizen] = strings.splitAt(value, 6, 7, 10, 11);

    if (!'01'.includes(citizen)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!strings.isdigits(gender)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!isValidDateCompactYYMMDD(bdate)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!luhnChecksumValidate(value)) {
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
