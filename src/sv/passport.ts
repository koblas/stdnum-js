/**
 * Salvadoran Passport Number (Pasaporte salvadoreño).
 *
 * Format: One letter followed by 6 digits (format 'X999999'), per El Salvador's financial regulator (SSF) field-validation annexes for identity documents.
 *
 * Source
 *   https://ssf.gob.sv/images/stories/desc_normas_prud_bancos/69_npb4-41_A17.doc
 *   https://www.ssf.gob.sv/images/stories/desc_normas_prud_bancos/64_npb4-41_A12.doc
 *   https://es.wikipedia.org/wiki/Pasaporte_salvadore%C3%B1o
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{6}$/;

const impl: Validator = {
  name: 'Salvadoran Passport Number',
  localName: 'Pasaporte salvadoreño',
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

    if (value.length !== 7) {
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
