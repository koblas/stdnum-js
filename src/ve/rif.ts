/**
 * RIF (Registro Único de Información Fiscal, Venezuelan VAT number).
 *
 * The Registro Único de Información Fiscal  (RIF) is the Venezuelan fiscal
 * registration number. The number consists of 10 digits where the first digit
 * denotes the type of number (person, company or government) and the last digit
 * is a check digit.
 *
 * Source
 * https://wiki.scn.sap.com/wiki/display/CRM/Venezuela
 * VAT
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

//  Known number types and their corresponding value in the check
//  digit calculation
const companyTypes: Record<string, number> = {
  V: 4, // natural person born in Venezuela
  E: 8, // foreign natural person
  J: 12, // company
  P: 16, // passport
  G: 20, // government
};

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Venezuelan VAT Number',
  localName: 'Registro Único de Información Fiscal',
  abbreviation: 'RIF',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 1, 9).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value.substr(1))) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    const [ctype, body, check] = strings.splitAt(value, 1, 9);
    const first = companyTypes[ctype];
    if (first === undefined) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const digit =
      (first +
        weightedSum(body, {
          weights: [3, 2, 7, 6, 5, 4, 3, 2],
          modulus: 11,
        })) %
      11;

    if ('00987654321'[digit] !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: ['V', 'E'].includes(ctype),
      isCompany: ['J', 'G', 'P'].includes(ctype),
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
