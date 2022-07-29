/**
 * NIF (Numéro d'Immatriculation Fiscale, French tax identification number).
 *
 * The NIF (Numéro d'Immatriculation Fiscale, Numéro d'Identité Fiscale or
 * Numéro d'Identification Fiscale) also known as numéro fiscal de référence or
 * SPI (Simplification des Procédures d'Identification) is a 13-digit number
 * issued by the French tax authorities to people for tax reporting purposes.
 *
 * Source
 *   https://ec.europa.eu/taxation_customs/tin/tinByCountry.html
 *   https://fr.wikipedia.org/wiki/Numéro_d%27Immatriculation_Fiscale#France
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'French Tax Identification Number',
  localName: "Numéro d'Immatriculation Fiscale",
  abbreviation: 'NIF',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 2, 4, 7, 10).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 13) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    const startsWithOneOf0123 = [0, 1, 2, 3].includes(
      Number.parseInt(value[0], 10),
    );
    if (!strings.isdigits(value) || !startsWithOneOf0123) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const front = value.substring(0, value.length - 3);
    const sum = value.substring(value.length - 3);
    const checksumValid = parseInt(front, 10) % 511 === parseInt(sum, 10);
    if (!checksumValid) {
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
