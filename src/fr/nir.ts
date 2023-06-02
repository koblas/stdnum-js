/**
 * NIR (French personal identification number).
 *
 * The NIR (Numero d'Inscription au Repertoire national d'identification des
 * personnes physiques) is used to identify persons in France. It is popularly
 * known as the "social security number" and sometimes referred to as an INSEE
 * number. All persons born in France are registered in the Repertoire national
 * d'identification des personnes physiques (RNIPP) and assigned a NIR.
 *
 * The number consists of 15 digits: the first digit indicates the gender,
 * followed by 2 digits for the year or birth, 2 for the month of birth, 5 for
 * the location of birth (COG), 3 for a serial and 2 check digits.
 *
 * More information:
 *   https://www.insee.fr/en/metadonnees/definition/c1409
 *   https://en.wikipedia.org/wiki/INSEE_code
 *   http://resoo.org/docs/_docs/regles-numero-insee.pdf
 *   https://fr.wikipedia.org/wiki/Numéro_de_sécurité_sociale_en_France
 *   https://xml.insee.fr/schema/nir.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' .');
}

const impl: Validator = {
  name: 'French Personal Identification Number',
  localName: 'Numéro d’Inscription au RNIPP',
  abbreviation: 'NIR',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 1, 3, 5, 7, 10, 13).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 15) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const [pre, dept, post, check] = strings.splitAt(value, 5, 7, 13);

    if (
      !strings.isdigits(pre) ||
      !strings.isdigits(post) ||
      !strings.isdigits(check)
    ) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    let add = '';
    if (dept === '2A') {
      add = '19';
    } else if (dept === '2B') {
      add = '18';
    } else if (strings.isdigits(dept)) {
      add = dept;
    } else {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = parseInt(`${pre}${add}${post}`, 10) % 97;

    if (String(97 - sum).padStart(2, '0') !== check) {
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
