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

import { strings } from '../util';
import { validate as nnValidate } from './nn';
import { validate as bisValidate } from './bis';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

const impl: Validator = {
  name: 'Belgian Social Security Identification Number',
  localName: 'Identificatienummer van de Sociale Zekerheid',
  abbreviation: 'INSZ, NISS',
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
    const results = [nnValidate(input), bisValidate(input)];
    const validResult = results.find(r => r.isValid);
    if (validResult) return validResult;

    // The only case with two different error types is an invalid checksum and an
    // invalid format. The identifier with the checksum error had correct
    // formatting, so invalid checksum seems like the more descriptive error.

    const checksumErrorResult = results.find(r => r.error && r.error.name === 'InvalidChecksum');
    return checksumErrorResult || results[0];
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
