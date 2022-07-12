/**
 * VAT, MWST, TVA, IVA, TPV (Mehrwertsteuernummer, the Swiss VAT number).
 *
 * The Swiss VAT number is based on the UID but is followed by either "MWST"
 *
 * (Mehrwertsteuer, the German abbreviation for VAT), "TVA" (Taxe sur la valeur
 * ajoutée in French), "IVA" (Imposta sul valore aggiunto in Italian) or "TPV"
 * (Taglia sin la plivalur in Romanian).
 *
 * This module only supports the "new" format that was introduced in 2011 which
 * completely replaced the "old" 6-digit format in 2014.
 *
 * More information:
 *   https://www.ch.ch/en/value-added-tax-number-und-business-identification-number/
 *   https://www.uid.admin.ch/
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { validate as uidValidate } from './uid';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

const impl: Validator = {
  name: 'Swiss VAT Number',
  localName: 'Mehrwertsteuernummer',
  abbreviation: 'MWST/TVA/IVA',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    const [a, b, c, d, e] = strings.splitAt(value, 3, 6, 9, 12);

    return `${a}-${b}.${c}.${d} ${e}`;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 15 && value.length !== 16) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const [front, sufix] = strings.splitAt(value, 12);
    if (!['MWST', 'TVA', 'IVA', 'TPV'].includes(sufix)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const result = uidValidate(front);

    if (!result.isValid && result.error) {
      return { isValid: false, error: result.error };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
