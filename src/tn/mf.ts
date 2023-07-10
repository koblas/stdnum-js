/**
 * MF (Matricule Fiscal, Tunisia tax number).
 *
 * The MF consists of 4 parts: the "identifiant fiscal", the "code TVA", the "code
 * catégorie" and the "numéro d'etablissement secondaire".
 *
 * The "identifiant fiscal" consists of 2 parts: the "identifiant unique" and the
 * "clef de contrôle". The "identifiant unique" is composed of 7 digits. The "clef
 * de contrôle" is a letter, excluding "I", "O" and "U" because of their
 * similarity to "1", "0" and "4".
 *
 * The "code TVA" is a letter that tells which VAT regime is being used. The valid
 * values are "A", "P", "B", "D" and "N".
 *
 * The "code catégorie" is a letter that tells the category the contributor
 * belongs to. The valid values are "M", "P", "C", "N" and "E".
 *
 * The "numéro d'etablissement secondaire" consists of 3 digits. It is usually
 * "000", but it can be "001", "002"... depending on the branches. If it is not
 * "000" then "code catégorie" must be "E".
 *
 * Source
 *   https://futurexpert.tn/2019/10/22/structure-et-utilite-du-matricule-fiscal/
 *   https://www.registre-entreprises.tn/
 *
 * VAT
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' /.-');
}

const validRe = /^(\d+)(.*)$/;

function compactImpl(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = clean(input);

  if (err) {
    return ['', err];
  }

  const match = value.match(validRe);

  if (match && match.length === 3) {
    return [match[1].padStart(7, '0') + match[2], null];
  }

  return [value, null];
}

const VALID_CONTROL_KEYS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'N',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
const VALID_TVA_CODES = ['A', 'P', 'B', 'D', 'N'];
const VALID_CATEGORY_CODES = ['M', 'P', 'C', 'N', 'E'];

const impl: Validator = {
  name: 'Tunisia tax number',
  localName: 'Matricule Fiscal',
  abbreviation: 'MF',

  compact(input: string): string {
    const [value, error] = compactImpl(input);

    if (error) {
      throw error;
    }

    return value;
  },

  format(input: string): string {
    const [value, error] = compactImpl(input);

    if (error) {
      return input;
    }

    const [front, key, tva, category, rest] = strings.splitAt(
      value,
      7,
      8,
      9,
      10,
    );

    if (value.length === 8) {
      return `${front}/${key}`;
    }

    return `${front}/${key}/${tva}/${category}/${rest}`;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = compactImpl(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 8 && value.length !== 13) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const [front, key, tva, category, rest] = strings.splitAt(
      value,
      7,
      8,
      9,
      10,
    );

    if (!strings.isdigits(front)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!VALID_CONTROL_KEYS.includes(key)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (value.length !== 8) {
      if (!VALID_TVA_CODES.includes(tva)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!VALID_CATEGORY_CODES.includes(category)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!strings.isdigits(rest)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (rest !== '000' && category !== 'E') {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
