/**
* The BIS (Belgian Number for Foreigners) is an identifier for individuals such
* as cross-border workers who do not have a Belgian National Number. It has the
* same format as the Belgian National Number, but the month digits are increased
* by 40 if the sex of the person was known when the number was assigned and by
* 20 if not.
*
* Source
*  https://fr.wikipedia.org/wiki/Numéro_de_registre_national (Numéro de sécurité sociale)
*
* PERSON
*/

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { validStructure, validChecksum, toDateArray } from './personIdentifierHelpers';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

function toDob(firstSix: string): string {
  const [y, m, d] = toDateArray(firstSix).map(s => parseInt(s, 10));
  const adjustedDateArrays = [[y, m - 20, d], [y, m - 40, d]];
  // Allow 0 because a 0 month indicates an unknown DOB.
  const dobArray = adjustedDateArrays.find(ada => ada[1] >= 0 && ada[1] <= 12) || [];
  return dobArray.map(n => `${n}`.padStart(2, '0')).join('');
}

const impl: Validator = {
  name: 'Belgian Number for Foreigners',
  localName: 'Numéro BIS',
  abbreviation: 'BIS',
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
    const number = impl.compact(input);

    if (!strings.isdigits(number) || parseInt(number, 10) <= 0) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (number.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!validStructure(number, toDob)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!validChecksum(number, toDob)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: number,
      isIndividual: true,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
