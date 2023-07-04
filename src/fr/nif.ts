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
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [prefix, check] = strings.splitAt(value, 10);
    const pvalue = parseInt(prefix, 10);

    if (!'0123'.includes(value[0])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    // A zero value is not a valid value
    if (pvalue === 0) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (String(pvalue % 511).padStart(3, '0') !== check) {
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
