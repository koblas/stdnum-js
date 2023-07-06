/**
 * CNP (Cod Numeric Personal, Romanian Numerical Personal Code).
 *
 * The CNP is a 13 digit number that includes information on the person's
 * gender, birth date and country zone.
 *
 * Source:
 * https://ro.wikipedia.org/wiki/Cod_numeric_personal
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYYYMMDD, strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const century: Record<string, string> = {
  '0': '19', // shouldn't happen,
  '1': '19',
  '2': '19',
  '3': '18',
  '4': '18',
  '5': '20',
  '6': '20',
  '7': '19',
  '8': '19',
  '9': '19',
};

// The Romanian counties
const COUNTIES: Record<string, string> = {
  '01': 'Alba',
  '02': 'Arad',
  '03': 'Arges',
  '04': 'Bacau',
  '05': 'Bihor',
  '06': 'Bistrita-Nasaud',
  '07': 'Botosani',
  '08': 'Brasov',
  '09': 'Braila',
  '10': 'Buzau',
  '11': 'Caras-Severin',
  '12': 'Cluj',
  '13': 'Constanta',
  '14': 'Covasna',
  '15': 'Dambovita',
  '16': 'Dolj',
  '17': 'Galati',
  '18': 'Gorj',
  '19': 'Harghita',
  '20': 'Hunedoara',
  '21': 'Ialomita',
  '22': 'Iasi',
  '23': 'Ilfov',
  '24': 'Maramures',
  '25': 'Mehedinti',
  '26': 'Mures',
  '27': 'Neamt',
  '28': 'Olt',
  '29': 'Prahova',
  '30': 'Satu Mare',
  '31': 'Salaj',
  '32': 'Sibiu',
  '33': 'Suceava',
  '34': 'Teleorman',
  '35': 'Timis',
  '36': 'Tulcea',
  '37': 'Vaslui',
  '38': 'Valcea',
  '39': 'Vrancea',
  '40': 'Bucuresti',
  '41': 'Bucuresti - Sector 1',
  '42': 'Bucuresti - Sector 2',
  '43': 'Bucuresti - Sector 3',
  '44': 'Bucuresti - Sector 4',
  '45': 'Bucuresti - Sector 5',
  '46': 'Bucuresti - Sector 6',
  '47': 'Bucuresti - Sector 7 (desfiintat)',
  '48': 'Bucuresti - Sector 8 (desfiintat)',
  '51': 'Calarasi',
  '52': 'Giurgiu',
};

const VALID_COUNTIES = Object.keys(COUNTIES);

const impl: Validator = {
  name: 'Romanian Numerical Personal Code',
  localName: 'Cod Numeric Personal',
  abbreviation: 'CNP',
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
    if (value.length !== 13) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value[0] === '0') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [first, dvalue, county] = strings.splitAt(value, 1, 7, 9);

    if (!isValidDateCompactYYYYMMDD(`${century[first]}${dvalue}`)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!VALID_COUNTIES.includes(county)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, check] = strings.splitAt(value, -1);
    const sum = weightedSum(front, {
      weights: [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9],
      modulus: 11,
    });

    const digit = sum === 10 ? '1' : String(sum);

    if (check !== digit) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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
