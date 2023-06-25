/**
 * Btw-identificatienummer (Omzetbelastingnummer, the Dutch VAT number).
 *
 * The btw-identificatienummer (previously the btw-nummer) is the Dutch number
 * for identifying parties in a transaction for which VAT is due. The btw-nummer
 * is used in communication with the tax agency while the
 * btw-identificatienummer (EORI-nummer) can be used when dealing with other
 * companies though they are used interchangeably.
 *
 * The btw-nummer consists of a RSIN or BSN followed by the letter B and two
 * digits that identify the number of the company created. The
 * btw-identificatienummer has a similar format but different checksum and does
 * not contain the BSN.
 *
 * Source
 *   https://en.wikipedia.org/wiki/VAT_identification_number
 *   https://nl.wikipedia.org/wiki/Btw-nummer_(Nederland)
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { mod97base10Validate, weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -.', 'NL');

  if (err) {
    return [value, err];
  }

  const [a, b] = strings.splitAt(value, -3);

  return [`${a.padStart(9, '0')}${b}`, null];
}

const impl: Validator = {
  name: 'Dutch VAT Number',
  localName: 'Btw-identificatienummer',
  abbreviation: 'Btw-nr.',
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
    const [a, b, c] = strings.splitAt(value, 9, 10);
    if (!strings.isdigits(a) || !strings.isdigits(c)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (b !== 'B') {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const sum = weightedSum(a, {
      weights: [9, 8, 7, 6, 5, 4, 3, 2, -1],
      modulus: 11,
    });

    if (sum % 11 !== 0 && !mod97base10Validate(`NL${a}${b}${c}`)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: `${a}${b}${c}`,
      isIndividual: false,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
