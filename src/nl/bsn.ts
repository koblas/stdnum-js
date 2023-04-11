/**
 * BSN (Burgerservicenummer, the Dutch citizen identification number).
 *
 * The BSN is a unique personal identifier and has been introduced as the
 * successor to the sofinummer. It is issued to each Dutch national. The number
 * consists of up to nine digits (the leading zeros are commonly omitted) and
 * contains a simple checksum.
 *
 * Source:
 *   https://en.wikipedia.org/wiki/National_identification_number#Netherlands
 *   https://nl.wikipedia.org/wiki/Burgerservicenummer
 *   http://www.burgerservicenummer.nl/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

function checksum(value: string): boolean {
  const nineCharValue = value.padStart(9, '0');
  const sum = weightedSum(nineCharValue, {
    weights: [9, 8, 7, 6, 5, 4, 3, 2, -1],
    modulus: 11,
  });
  return sum === 0;
}

const impl: Validator = {
  name: 'Dutch Citizen Identification Number',
  localName: 'Burgerservicenummer',
  abbreviation: 'BSN',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 4, 6).join('.');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (![8, 9].includes(value.length)) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!checksum(value)) {
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
