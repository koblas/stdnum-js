/**
 * Ecuadorian Passport Number (Pasaporte ecuatoriano).
 *
 * Format: Modern Ecuadorian e-passport (biometric, introduced Sept 2020) uses a 9-character alphanumeric code (book number) printed in the 'Número de pasaporte' field, distinct from the cédula. Letter/digit positions are not officially documented, so an alphanumeric 9-char pattern is used.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Ecuadorian_passport
 *   https://www.renovarpapeles.com/tramites/cual-es-el-numero-de-pasaporte-ecuatoriano/
 *   https://www.eluniverso.com/noticias/ecuador/conozca-los-detalles-y-el-numero-que-identifica-al-pasaporte-ecuatoriano-nota/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z0-9]{9}$/;

const impl: Validator = {
  name: 'Ecuadorian Passport Number',
  localName: 'Pasaporte ecuatoriano',
  abbreviation: 'Passport',
  examples: ['A12345678', 'AB1234567'],
  formats: ['ccccccccc'],

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

export const {
  name,
  localName,
  abbreviation,
  examples,
  formats,
  validate,
  format,
  compact,
} = impl;
