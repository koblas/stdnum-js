/**
 * CR (Cédula de Residencia, Costa Rica foreigners ID number).
 *
 * The Cédula de Residencia (CR), also know as DIMEX or Documento de
 * Identificación Migratorio para Extranjeros, is an identifier of foreigners in
 * Costa Rica.
 *
 * This number consists of 11 or 12 digits in the form 1NNN-CC...C-EE...E where
 * NNN represents the code of the country the foreigner comes from as specified
 * by Costa Rica's Dirección General de Migración y Extranjería, CC...C is a
 * sequence telling how many Cédula de Residencia have been issued in total and
 * EE...E is a sequence telling how many Cédula de Residencia have been issued
 * for that particular foreign country.
 *
 * Source
 *   https://www.hacienda.go.cr/consultapagos/ayuda_cedulas.htm
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Costa Rica Foreigners ID Number',
  localName: 'Cédula de Residencia',
  abbreviation: 'CR',
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
    if (value.length !== 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (value[0] !== '1') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
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
