/**
 * n° TVA (taxe sur la valeur ajoutée, French VAT number).
 *
 * The n° TVA (Numéro d'identification à la taxe sur la valeur ajoutée) is the
 * SIREN (Système d’Identification du Répertoire des Entreprises) prefixed by
 * two digits. In old style numbers the two digits are numeric, with new
 * style numbers at least one is a alphabetic.
 *
 * Source:
 *   https://wiki.scn.sap.com/wiki/display/CRM/France
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import * as siren from './siren';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -.');

  if (err !== null) {
    return [value, err];
  }
  if (value.startsWith('FR')) {
    return [value.substr(2), null];
  }

  return [value, null];
}

// the valid characters for the first two digits (O and I are missing)
const alphabet = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';

const impl: Validator = {
  name: 'French VAT Number',
  localName: "Numéro d'Identification à la Taxe sur la Valeur Ajoutée",
  abbreviation: 'n°TVA',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 2, 5, 8).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    const [check, back] = strings.splitAt(value, 2);
    if (!alphabet.includes(check[0]) || !alphabet.includes(check[1])) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!strings.isdigits(back)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    // numbers from Monaco are valid TVA but not SIREN
    if (value.substring(2, 5) !== '000') {
      const r = siren.validate(value.substr(2));
      if (!r.isValid) {
        return r;
      }
    }

    if (strings.isdigits(check)) {
      const sum = (12 + 3 * (parseInt(back, 10) % 97)) % 97;

      if (String(sum) !== check) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    } else {
      // const FACTORS = {
      //   1: [24, 10],
      //   0: [34, 100],
      // };
      // const factors = FACTORS[strings.isdigits(check[0]) ? 1 : 0];

      // const cvalue =
      //   alphabet.indexOf(check[0]) * factors[0] +
      //   alphabet.indexOf(check[1]) -
      //   factors[1];

      const c0 = alphabet.indexOf(check[0]);
      const c1 = alphabet.indexOf(check[1]);

      let cvalue;
      if (c0 < 10) {
        cvalue = c0 * 24 + c1 - 10;
      } else {
        cvalue = c0 * 34 + c1 - 100;
      }

      const sum = (parseInt(back, 10) + 1 + Math.floor(cvalue / 11)) % 11;
      const digit = cvalue % 11;
      if (sum !== digit) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
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
