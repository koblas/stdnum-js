/**
 * CIF (Código de Identificación Fiscal, Spanish company tax number).
 *
 * The CIF is a tax identification number for legal entities. It has 9 digits
 * where the first digit is a letter (denoting the type of entity) and the
 * last is a check digit (which may also be a letter).
 *
 * Sources:
 *   https://es.wikipedia.org/wiki/Código_de_identificación_fiscal
 *
 * TAX/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumDigit } from '../util/checksum';

const entityTypes = 'ABCDEFGHJNPQRSUVW';
const letterCheckDigits = 'JABCDEFGHI';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Spanish Company Tax Number',
  localName: 'Código de Identificación Fiscal',
  abbreviation: 'CIF',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 1, 8).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const [first, body, check] = strings.splitAt(value, 1, 8);

    if (
      !strings.isdigits(body) ||
      !entityTypes.includes(first) ||
      !(strings.isdigits(check) || letterCheckDigits.includes(check))
    ) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const cs = parseInt(luhnChecksumDigit(body), 10);
    // Two systems of check digits
    const possibleCheckDigits = letterCheckDigits[cs] + String(cs);

    if (!possibleCheckDigits.includes(check)) {
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
