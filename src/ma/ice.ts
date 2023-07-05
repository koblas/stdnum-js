/**
 * ICE (a Moroccan company establishment identification number).
 *
 * The ICE (Identifiant Commun de l'Entreprises)
 * is a 15 (9 positions for the company, 4 positions for the establishment and 2 control digits), digit number used to identify Moroccan companies' establishments
 * and facilities. The validation checksum is unknown
 *
 * Sources
 *   https://www.ice.gov.ma/
 *   https://www.ice.gov.ma/ICE/Depliant_ICE.pdf
 *   https://www.ice.gov.ma/ICE/Guide_ICE.pdf
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, mod97base10Validate } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -/');
}

const impl: Validator = {
  name: 'Moroccan Company Establishment Identification Number',
  localName: "Identifiant Commun de l'Entreprises",
  abbreviation: 'ICE',
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
    if (value.length !== 15) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!mod97base10Validate(value, 0)) {
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
