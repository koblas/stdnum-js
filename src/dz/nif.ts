/**
 * NIF, sometimes N.I.F. (Numéro d'Identification Fiscale, Algeria tax number).
 *
 * The NIF was adopted by the Algerian tax authorities on 2006, replacing the NIS
 * number.
 *
 * The NIF applies to physical persons, legal persons, legal entities,
 * administrative entities, local branches for foreign companies, associations,
 * professional organisations, etc.
 *
 * The NIF consists of 15 digits, but sometimes it can be 20 digits long in order
 * to represent branches or secondary establishments.
 *
 * Source
 *   http://www.jecreemonentreprise.dz/index.php?option=com_content&view=article&id=612&Itemid=463&lang=fr
 *   https://www.mf.gov.dz/index.php/fr/fiscalite
 *   https://cnrcinfo.cnrc.dz/numero-didentification-fiscale-nif/
 *   https://nifenligne.mfdgi.gov.dz/
 *   http://nif.mfdgi.gov.dz/nif.asp
 *
 * ENTITY/PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

// const validRe = /^[PCGQV]{1}00[A-Z0-9]{8}$/;

// const ALPHABET = '0123456789X';

const impl: Validator = {
  name: 'Algeria tax number',
  localName: "Numéro d'Identification Fiscale",
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

    return value;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 15 && value.length !== 20) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
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
