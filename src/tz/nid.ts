/**
 * NIN (National Identification Number).
 *
 * Source
 *   https://services.nida.go.tz/get_nin
 *   https://www.nao.go.tz/uploads/Registration_and_Issuance_of_National_Identification_Cards_by_NIDA.pdf
 *   https://www.id4africa.com/2018_event/Presentations/PS2/1-2-2_Tanzania_Alphonce_Malibiche.pdf
 *   https://id4africa.com/wp-content/uploads/2023/06/PS2-S3-1-Rumatila-Temba-Tanzania.pdf
 *   https://medium.com/@MahimbiG/security-for-your-tanzania-national-id-nida-38d5aa30b233
 *   https://nida.go.tz/docs/APPLICATION-FORM-2A-NIDA.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{20}$/;

const impl: Validator = {
  name: 'National Identification Number',
  localName: 'Namba ya Kitambulisho cha Taifa',
  abbreviation: 'NIN',

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

    if (value.length !== 20) {
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
