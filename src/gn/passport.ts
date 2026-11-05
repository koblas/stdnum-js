/**
 * Guinean Passport Number (Passeport guinéen).
 *
 * Format: 9 characters, one letter (or digit) followed by eight digits (e.g. D00003001).
 * The PRADO specimens show the passport number (O00000000) apart from the 15-digit
 * personal number (Numéro Personnel, 9YYMMDD99999999), which is not the passport number.
 *
 * Source
 *   https://www.consilium.europa.eu/prado/en/GIN-AO-03001/index.html (specimen, 2018)
 *   https://www.consilium.europa.eu/prado/en/GIN-AO-02001/index.html (specimen, 2014)
 *   https://sanctionslist.ofac.treas.gov/Home/SdnList (OFAC SDN list: D00003001)
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

const idRegexp = /^[A-Z0-9]\d{8}$/;

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

    if (value.length !== 9) {
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
