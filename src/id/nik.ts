/**
 * NIK (Nomor Induk Kependudukan, Indonesian identity number).
 *
 * The Nomor Induk Kependudukan (NIK, Population Identification Number,
 * sometimes known as Nomor Kartu Tanda Penduduk or Nomor KTP) is issued to
 * Indonesian citizens.
 *
 * The number consists of 16 digits in the format PPRRSSDDMMYYXXXX where PPRRSS
 * (province, city/regency, district) indicates the place of residence when
 * the number was issued. It is followed by a DDMMYY date of birth (for women
 * 40 is added to the day). The last 4 digits make the number unique.
 *
 * Unlike python-stdnum, only the province code is checked, against the 38
 * Kemendagri province codes. python-stdnum checks the first 4 digits against
 * a regency list that uses older province codes (Papua as 94, West Papua as
 * 91) and lacks North Kalimantan (65) and the provinces created in 2022, so
 * it rejects NIKs issued there.
 *
 * Source
 *   https://id.wikipedia.org/wiki/Nomor_Induk_Kependudukan
 *   https://en.wikipedia.org/wiki/Provinces_of_Indonesia (province codes)
 *   https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/id/nik.py
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDate, strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

// Kemendagri province codes
const PROVINCES = [
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '21',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '51',
  '52',
  '53',
  '61',
  '62',
  '63',
  '64',
  '65',
  '71',
  '72',
  '73',
  '74',
  '75',
  '76',
  '81',
  '82',
  '91',
  '92',
  '93',
  '94',
  '95',
  '96',
];

const impl: Validator = {
  name: 'Indonesian Identity Number',
  localName: 'Nomor Induk Kependudukan',
  abbreviation: 'NIK',

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
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (value.length !== 16) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!PROVINCES.includes(value.slice(0, 2))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    // Women have 40 added to the day; the century is not encoded
    const day = String(parseInt(value.slice(6, 8), 10) % 40).padStart(2, '0');
    const month = value.slice(8, 10);
    const year = value.slice(10, 12);
    if (
      !isValidDate(`19${year}`, month, day) &&
      !isValidDate(`20${year}`, month, day)
    ) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
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
