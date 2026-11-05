/**
 * Colombian Passport Number (Pasaporte colombiano).
 *
 * Format: Colombian passport number: alphanumeric booklet serial (Decreto 2465/2010). Current booklets use two letters followed by six digits (e.g. PS123456); older ones are 9 alphanumeric characters.
 *
 * Source
 *   https://cancilleria.gov.co/normograma/compilacion/docs/decreto_2465_2010.htm
 *   https://www.risaralda.gov.co/preguntas-frecuentes/65/pasaportes/
 *   https://sanctionslist.ofac.treas.gov/Home/SdnList (OFAC SDN list: real passport numbers with future expiry)
 *   https://en.wikipedia.org/wiki/Colombian_passport
 *   https://www.cancilleria.gov.co/en/machine-readable-zone-ordinary-passport
 *   https://www.cancilleria.gov.co/help/faq/passports
 *   https://www.consilium.europa.eu/prado/en/COL-AO-01001/index.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z0-9]{8,9}$/;

const impl: Validator = {
  name: 'Colombian Passport Number',
  localName: 'Pasaporte colombiano',
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

    if (value.length < 8 || value.length > 9) {
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
