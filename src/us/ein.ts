/**
 * EIN (U.S. Employer Identification Number).
 *
 * The Employer Identification Number, also known as Federal Employer
 * Identification Number (FEIN), is used to identify a business entity in the
 * United States. It is issued to anyone that has to pay withholding taxes on
 * employees.
 *
 * Sources:
 *    https://en.wikipedia.org/wiki/Social_Security_number
 *    https://www.ssa.gov/employer/verifySSN.htm
 *
 * INDIVIDUAL
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

// https://www.irs.gov/businesses/small-businesses-self-employed/how-eins-are-assigned-and-valid-ein-prefixes

const prefixes = [
  // Brookhaven
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '11',
  '13',
  '14',
  '16',
  '21',
  '22',
  '23',
  '25',
  '34',
  '51',
  '52',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '65',
  // Andover
  '10',
  '12',
  // Fresno"
  '15',
  '24',
  // Internet
  '20',
  '26',
  '27',
  '45',
  '46',
  '47',
  '81',
  '82',
  '83',
  '84',
  // Cincinnati
  '30',
  '32',
  '35',
  '36',
  '37',
  '38',
  '61',
  // Small Business Administration (SBA)
  '31',
  // Philadelphia
  '33',
  '39',
  '41',
  '42',
  '43',
  '46',
  '48',
  '62',
  '63',
  '64',
  '66',
  '68',
  '71',
  '72',
  '73',
  '74',
  '75',
  '76',
  '77',
  '85',
  '86',
  '87',
  '88',
  '91',
  '92',
  '93',
  '98',
  '99',
  // Kansas City
  '40',
  '44',
  // Austin
  '50',
  '53',
  // Atlanta
  '60',
  '67',
  // Ogden
  '80',
  '90',
  // Memphis
  '94',
  '95',
];

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, '- ');
}

const impl: Validator = {
  name: 'U.S. Employer Identification Number',
  localName: 'Employer Identification Number',
  abbreviation: 'EIN',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 2).join('-');
  },

  /**
   * Check if the number is a valid EIN number.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    // if (invalidSSN.includes(value)) {
    //   return { isValid: false, error: new exceptions.InvalidComponent() };
    // }
    if (!prefixes.includes(value.substr(0, 2))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
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
