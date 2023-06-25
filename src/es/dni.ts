/**
 * DNI (Documento Nacional de Identidad, Spanish personal identity codes).
 *
 * The DNI is a 9 digit number used to identify Spanish citizens. The last
 * digit is a checksum letter.
 *
 * Foreign nationals, since 2010 are issued an NIE (Número de Identificación
 * de Extranjeros, Foreigner's Identity Number) instead.
 *
 * Sources:
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/SPAIN-TIN.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

const checkDigits = 'TRWAGMYFPDXBNJZSQVHLCKE';

export function calcCheckDigit(value: string): string {
  return checkDigits[parseInt(value.substr(0, 8), 10) % 23];
}

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Spanish Personal Identify Code',
  localName: 'Documento Nacional de Identidad',
  abbreviation: 'DNI',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 8).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const [body, check] = strings.splitAt(value, 8);

    if ('KLM'.includes(body[0]) && strings.isdigits(body.substring(1))) {
      // Currently no test data for these cases, so
      // we're assuming they're good based on format
    } else if (!strings.isdigits(body)) {
      // Not all digits in the body, it's not valid
      return { isValid: false, error: new exceptions.InvalidComponent() };
    } else if (calcCheckDigit(body) !== check) {
      // Check the checksum on a non-[KLM] person
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
