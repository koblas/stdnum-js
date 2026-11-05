/**
 * Anguillan Passport Number (Anguilla Passport).
 *
 * Format: Modern Anguilla passports are British Overseas Territory passports issued since 2015 by HM Passport Office (UK), using the UK format of 9 digits. An older British-territory format of two letters followed by six digits is retained via alternation.
 *
 * Source
 *   https://en.wikipedia.org/wiki/British_passport_(Anguilla)
 *   https://learn.microsoft.com/en-us/purview/sit-defn-us-uk-passport-number
 *   https://www.gov.ai/document/forms/passport/Applying%20for%20an%20Anguilla%20BOT%20Passport%20-%20Guidance%20Notes.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{9}$|^[A-Z]{2}\d{6}$/;

const impl: Validator = {
  name: 'Anguillan Passport Number',
  localName: 'Anguilla Passport',
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
