/**
 * BTW, TVA, NWSt, ondernemingsnummer (Belgian enterprise number).
 *
 * The enterprise number (ondernemingsnummer) is a unique identifier of
 * companies within the Belgian administrative services. It was previously
 * the VAT ID number. The number consists of 10 digits, starting with 0 or 1,
 * and ends with a mod-97 check: the last 2 digits are 97 minus the first 8
 * digits mod 97, so they are always between 01 and 97.
 *
 * Unlike python-stdnum, check values 00, 98 and 99 are rejected. python-stdnum
 * tests (first 8 digits + last 2 digits) % 97 === 0, which also accepts them.
 *
 * Source
 *   https://github.com/arthurdejong/python-stdnum/issues/488 (first digit)
 *   https://github.com/OpenPEPPOL/peppol-bis-invoice-3/blob/master/rules/sch/PEPPOL-EN16931-UBL.sch (u:mod97-0208, check digits)
 *   https://github.com/koblas/stdnum-js/issues/91 (difference from python-stdnum)
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  // eslint-disable-next-line prefer-const
  let [value, err] = strings.cleanUnicode(input, ' -.');

  if (err !== null) {
    return [value, err];
  }
  if (value.startsWith('BE')) {
    value = value.slice(2);
  }
  if (value.startsWith('(0)')) {
    value = `0${value.slice(3)}`;
  }
  if (value.length === 9) {
    value = `0${value}`;
  }

  return [value, null];
}

const impl: Validator = {
  name: 'Belgian VAT Number',
  localName: 'Ondernemingsnummer',
  abbreviation: 'BTW, NWSt',
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
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value[0] !== '0' && value[0] !== '1') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, sum] = strings.splitAt(value, -2);

    if (97 - (parseInt(front, 10) % 97) !== parseInt(sum, 10)) {
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
