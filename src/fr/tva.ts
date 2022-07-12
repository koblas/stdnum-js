/**
 * n° TVA (taxe sur la valeur ajoutée, French VAT number).
 *
 * The n° TVA (Numéro d'identification à la taxe sur la valeur ajoutée) is the
 * SIREN (Système d’Identification du Répertoire des Entreprises) prefixed by
 * two digits. In old style numbers the two digits are numeric, with new
 * style numbers at least one is a alphabetic.
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
    if (!alphabet.includes(value[0]) || !alphabet.includes(value[1])) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!strings.isdigits(value.substr(2))) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    // numbers from Monaco are valid TVA but not SIREN
    if (value.substr(2, 3) !== '000') {
      const r = siren.validate(value.substr(2));
      if (!r.isValid) {
        return r;
      }
    }
    if (strings.isdigits(value)) {
      const [check, back] = strings.splitAt(value, 2);

      const sum = parseInt(`${back}12`, 10) % 97;
      if (parseInt(check, 10) !== sum) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    } else {
      const [check, back] = strings.splitAt(value, 2);

      let cvalue;
      if (strings.isdigits(check[0])) {
        cvalue =
          alphabet.indexOf(check[0]) * 24 + alphabet.indexOf(check[1]) - 10;
      } else {
        cvalue =
          alphabet.indexOf(check[0]) * 34 + alphabet.indexOf(check[1]) - 100;
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
