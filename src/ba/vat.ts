/**
 * PDV broj (Bosnia and Herzegovina VAT number).
 *
 * The 12 digit VAT (PDV) number is the 13 digit JIB without its leading 4
 * (Pravilnik o registraciji i upisu u Jedinstveni registar obveznika
 * indirektnih poreza, article 21). It is validated as the corresponding JIB.
 *
 * Sources
 *   https://www.uino.gov.ba/portal/wp-content/uploads/PROPISI/2_Porezi/1_PDV/2_Pravilnici/B/B-2-Pravilnik-o-registraciji-i-upisu-u-Jedinstveni-registar-obveznika-indirektnih-poreza-Sluzbeni-glasnik-BiH-broj-5112b.pdf
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { validate as jibValidate } from './jib';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./', 'BA');
}

const impl: Validator = {
  name: 'Bosnia and Herzegovina VAT Number',
  localName: 'PDV broj',
  abbreviation: 'PDV',
  examples: ['200211100005'],
  formats: ['nnnnnnnnnnnn'],

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

    const result = jibValidate(`4${value}`);
    if (!result.isValid) {
      return result;
    }

    return { ...result, compact: value };
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
