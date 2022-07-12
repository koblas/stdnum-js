/**
 * CUI or CIF (Codul Unic de Înregistrare, Romanian company identifier).
 *
 * The CUI (Codul Unic de Înregistrare) is assigned to companies that are
 * required to register with the Romanian Trade Register. The CIF (Codul de
 * identificare fiscală) is identical but assigned to entities that have no such
 * requirement. The names seem to be used interchangeably and some sources
 * suggest that CIF is the new name for CUI.
 *
 * This number can change under some conditions. The number can be prefixed with
 * RO to indicate that the entity has been registered for VAT.
 *
 * Source:
 *     https://ro.wikipedia.org/wiki/Cod_de_identificare_fiscală
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -', 'RO');
}

const impl: Validator = {
  name: 'Romanian Company Identifier',
  localName: 'Codul Unic de Înregistrare',
  abbreviation: 'CUI',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 3, 6).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length < 2 || value.length > 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value) || value[0] === '0') {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value.padStart(9, '0'), -1);

    const sum =
      10 *
      weightedSum(front, {
        weights: [7, 5, 3, 2, 1, 7, 5, 3, 2],
        modulus: 11,
      });

    if (String(sum % 10) !== check) {
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
