/**
 * Uruguayan Passport Number (Pasaporte uruguayo).
 *
 * Format: Uruguayan passport (booklet) number per DNIC: since Decreto 232/014 the passport number is the 'numero y serie de libreta' (booklet number and series) rather than the holder's cedula de identidad. In practice the booklet number is a letter-series prefix followed by six digits. Older booklets are reported as one letter + six digits (e.g. A123456); newer electronic passports as three letters + six digits (e.g. ABC123456). Total length 7-9 characters.
 *
 * Source
 *   https://www.nacionalidad.uy/downloads/DNIC-MANUAL-DE-DOCUMENTO-DE-IDENTIDAD-Y-PASAPORTE-ELECTRNICO-160119.pdf
 *   https://www.impo.com.uy/bases/decretos-reglamento/129-2014
 *   https://en.wikipedia.org/wiki/Uruguayan_passport
 *   https://www.gub.uy/ministerio-interior/comunicacion/publicaciones/preguntas-frecuentes-pasaporte-uruguayo/preguntas-frecuentes-pasaporte-7
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{1,3}\d{6}$/;

const impl: Validator = {
  name: 'Uruguayan Passport Number',
  localName: 'Pasaporte uruguayo',
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

    if (value.length < 7 || value.length > 9) {
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
