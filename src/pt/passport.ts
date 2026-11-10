/**
 * Portuguese Passport Number (Passaporte português).
 *
 * Format: Two letters followed by six digits (e.g. CB123456) for passports issued since 15 March 2018 (DL 19/2018); the previous series used one letter followed by six digits (e.g. A123456).
 *
 * Source
 *   https://files.diariodarepublica.pt/1s/2018/03/05200/0127501284.pdf
 *   https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=2861&tabela=leis&ficha=1&pagina=1&so_miolo=S
 *   https://learn.microsoft.com/en-us/purview/sit-defn-portugal-passport-number
 *   https://en.wikipedia.org/wiki/Portuguese_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{1,2}\d{6}$/;

const impl: Validator = {
  name: 'Portuguese Passport Number',
  localName: 'Passaporte português',
  abbreviation: 'Passport',

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

    if (value.length < 7 || value.length > 8) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const match = value.match(idRegexp);
    if (!match) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
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
