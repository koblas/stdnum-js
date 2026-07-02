/**
 * Guinean Passport Number (Passeport guinéen).
 *
 * Format: Guinea passport/personal number documented as 15 numeric digits in the form 9YYMMDD99999999 (a leading digit, a YYMMDD date-of-birth component, then 8 sequential digits). All numeric, no letters.
 *
 * Source
 *   https://danskebank.fi/-/media/pdf/danske-bank/fi/en/national-identifier-list-final.pdf
 *   https://www.amba-guinee.de/wp-content/uploads/2022/05/Liste_des_Passpport_202205.pdf
 *   https://fr.wikipedia.org/wiki/Passeport_guin%C3%A9en
 *   https://www.paf.gov.gn/dnpaf/?page_id=125&lang=en
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{15}$/;

const impl: Validator = {
  name: 'Guinean Passport Number',
  localName: 'Passeport guinéen',
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

    if (value.length !== 15) {
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
