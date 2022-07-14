/**
* The Belgian Social Security Identification Number is an 11 digit number.
* It can be either a National Register Number (NN, NISS) or BIS.
*
* Sources
*  https://fr.wikipedia.org/wiki/Numéro_de_registre_national
*  https://www2.deloitte.com/content/dam/Deloitte/be/Documents/tax/TaxAlerts/IndividualTaxAlerts/Social%20Security%20alert%20-%20BelgianIDpro%20-%2026%20Nov%202020.pdf
*
* PERSON
*/

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { validate as nnValidate } from './nn';
import { validate as bisValidate } from './bis';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

function getValidation(number: string): ValidateReturn {
  const results = [nnValidate(number), bisValidate(number)];
  const validResult = results.find(r => r.isValid);
  if (validResult) return validResult;

  // The only case with two different error types is an invalid checksum and an
  // invalid format. The identifier with the checksum error had correct
  // formatting, so invalid checksum seems like the more descriptive error.

  const checksumErrorResult = results.find(r => r.error && r.error.name === 'InvalidChecksum');
  return checksumErrorResult || results[0];
}

const impl: Validator = {
  name: '',
  localName: '',
  abbreviation: 'INSZ',
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
    const number = impl.compact(input);

    if (!strings.isdigits(number) || parseInt(number, 10) <= 0) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (number.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    return getValidation(number);
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
