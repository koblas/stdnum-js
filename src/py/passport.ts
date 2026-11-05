/**
 * Paraguayan Passport Number (Pasaporte paraguayo).
 *
 * Format: Paraguayan passport number. No authoritative format is published; real numbers seen range from 6 to 9 alphanumeric characters (e.g. 1035562, 002301585, D15449), so any 6 to 9 letters or digits are accepted.
 *
 * Source
 *   https://sanctionslist.ofac.treas.gov/Home/SdnList (OFAC SDN list: real passport numbers with future expiry)
 *   https://en.wikipedia.org/wiki/Paraguayan_passport
 *   https://www.mre.gov.py/index.php/tramites/pasaportes
 *   https://danskebank.fi/-/media/pdf/danske-bank/fi/en/national-identifier-list-final.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z0-9]{6,9}$/;

const impl: Validator = {
  name: 'Paraguayan Passport Number',
  localName: 'Pasaporte paraguayo',
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

    if (value.length < 6 || value.length > 9) {
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
