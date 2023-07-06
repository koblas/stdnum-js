/**
 * SIRET (a French company establishment identification number).
 *
 * The SIRET (Système d'Identification du Répertoire des Établissements)
 * is a 14 digit number used to identify French companies' establishments
 * and facilities. The Luhn checksum is used to validate the numbers (except
 * for La Poste).
 *
 * Sources:
 *   https://fr.wikipedia.org/wiki/Système_d'identification_du_répertoire_des_établissements
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate, weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -/');
}

const impl: Validator = {
  name: 'French Company Establishment Identification Number',
  localName: "Système d'Identification du Répertoire des Établissements",
  abbreviation: 'SIRET',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 3, 6, 9).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 14) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value.startsWith('356000000') && value !== '35600000000048') {
      const sum = weightedSum(value, {
        weights: [1],
        modulus: 5,
      });
      if (sum !== 0) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    } else if (!luhnChecksumValidate(value)) {
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
