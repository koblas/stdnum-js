/**
 * NI (Número de identidad, Cuban identity card numbers).
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYYYMMDD, strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'Cuban Identity Card Number',
  localName: 'Número de Identidad',
  abbreviation: 'NI',
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
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [yy, mm, dd, cen] = strings.splitAt(value, 2, 4, 6, 7);
    let year;
    if ('012345'.includes(cen)) {
      year = `19${yy}`;
    } else if ('678'.includes(cen)) {
      year = `20${yy}`;
    } else if (cen === '9') {
      year = `18${yy}`;
    } else {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!isValidDateCompactYYYYMMDD(`${year}${mm}${dd}`)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
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
