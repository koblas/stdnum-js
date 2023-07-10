/**
 * NN, NISS, RRN (Belgian national number).
 *
 * The national registration number (Rijksregisternummer, Numéro de registre
 * national, Nationalregisternummer) is a unique identification number of
 * natural persons who are registered in Belgium.
 *
 * The number consists of 11 digits and includes the person's date of birth and
 * gender. It encodes the date of birth in the first 6 digits in the format
 * YYMMDD. The following 3 digits represent a counter of people born on the same
 * date, seperated by sex (odd for male and even for females respectively). The
 * final 2 digits form a check number based on the 9 preceding digits.
 *
 * Source
 *  https://nl.wikipedia.org/wiki/Rijksregisternummer
 *  https://fr.wikipedia.org/wiki/Numéro_de_registre_national
 *  https://www.ibz.rrn.fgov.be/fileadmin/user_upload/nl/rr/instructies/IT-lijst/IT000_Rijksregisternummer.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { validStructure, validChecksum } from './personIdentifierHelpers';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

const impl: Validator = {
  name: 'Belgian National Number',
  localName: 'Numéro National',
  abbreviation: 'NN, RN',
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
    const value = impl.compact(input);

    if (!strings.isdigits(value) || parseInt(value, 10) <= 0) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!validStructure(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!validChecksum(value)) {
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
