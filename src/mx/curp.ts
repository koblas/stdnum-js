/**
 * CURP (Clave Única de Registro de Población, Mexican personal ID).
 *
 * The Clave Única de Registro de Población (Population Registry Code) is unique
 * identifier for both citizens and residents of Mexico. The is an 18-character
 * alphanumeric that contains certain letters from the person's name, their
 * gender and birth date and a check digit.
 *
 * More information:
 *   https://en.wikipedia.org/wiki/CURP
 *   https://www.gob.mx/curp/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYMMDD, strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const nameBlacklist = new Set([
  'BACA',
  'BAKA',
  'BUEI',
  'BUEY',
  'CACA',
  'CACO',
  'CAGA',
  'CAGO',
  'CAKA',
  'CAKO',
  'COGE',
  'COGI',
  'COJA',
  'COJE',
  'COJI',
  'COJO',
  'COLA',
  'CULO',
  'FALO',
  'FETO',
  'GETA',
  'GUEI',
  'GUEY',
  'JETA',
  'JOTO',
  'KACA',
  'KACO',
  'KAGA',
  'KAGO',
  'KAKA',
  'KAKO',
  'KOGE',
  'KOGI',
  'KOJA',
  'KOJE',
  'KOJI',
  'KOJO',
  'KOLA',
  'KULO',
  'LILO',
  'LOCA',
  'LOCO',
  'LOKA',
  'LOKO',
  'MAME',
  'MAMO',
  'MEAR',
  'MEAS',
  'MEON',
  'MIAR',
  'MION',
  'MOCO',
  'MOKO',
  'MULA',
  'MULO',
  'NACA',
  'NACO',
  'PEDA',
  'PEDO',
  'PENE',
  'PIPI',
  'PITO',
  'POPO',
  'PUTA',
  'PUTO',
  'QULO',
  'RATA',
  'ROBA',
  'ROBE',
  'ROBO',
  'RUIN',
  'SENO',
  'TETA',
  'VACA',
  'VAGA',
  'VAGO',
  'VAKA',
  'VUEI',
  'VUEY',
  'WUEI',
  'WUEY',
]);

const validStates = new Set([
  'AS',
  'BC',
  'BS',
  'CC',
  'CH',
  'CL',
  'CM',
  'CS',
  'DF',
  'DG',
  'GR',
  'GT',
  'HG',
  'JC',
  'MC',
  'MN',
  'MS',
  'NE',
  'NL',
  'NT',
  'OC',
  'PL',
  'QR',
  'QT',
  'SL',
  'SP',
  'SR',
  'TC',
  'TL',
  'TS',
  'VZ',
  'YN',
  'ZS',
]);

const checkAlphabet = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ';
const checkAlphabetDict: Record<string, number> = checkAlphabet
  .split('')
  .reduce((acc, c, idx) => ({ ...acc, [c]: idx }), {});

const impl: Validator = {
  name: 'Mexican Personal Identification',
  localName: 'Clave Única de Registro de Población',
  abbreviation: 'CURP',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value.toLocaleUpperCase();
  },

  format(input: string): string {
    const [value] = clean(input);

    return value;
  },

  /**
   * Check if the number is a valid CURP number.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 18) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!/^[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9A-Z][0-9]$/.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!isValidDateCompactYYMMDD(value.substr(4, 6))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (nameBlacklist.has(value.substr(0, 4))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!['H', 'M', 'X'].includes(value[10])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!validStates.has(value.substr(11, 2))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const check = value
      .substr(0, 17)
      .split('')
      .reduce(
        (acc, c, idx) => acc + (checkAlphabetDict[c] ?? 0) * (18 - idx),
        0,
      );

    const checkStr = String((10 - (check % 10)) % 10);
    if (checkStr !== value.substr(17, 1)) {
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

function getBirthDateImpl(value: string) {
  const parts = strings.splitAt(value, 4, 6, 8);

  const yyN = parseInt(parts[1], 10);
  const mmN = parseInt(parts[2], 10) - 1;
  const ddN = parseInt(parts[3], 10);

  if (!Number.isNaN(parseInt(value[16], 10))) {
    return new Date(yyN + 1900, mmN, ddN);
  }
  return new Date(yyN + 2000, mmN, ddN);
}

///
// Convert the gender value into English values
//  CURP H = Hombre => Male (M)
//  CURP M = Mujer  => Female (F)
//  CURP X = gender neutral (X)
//
export function getGender(input: string): 'M' | 'F' | 'X' {
  const value = impl.compact(input)[10];

  if (value === 'X') {
    return 'X';
  } else if (value === 'H') {
    return 'M';
  }
  return 'F';
}

export function getBirthDate(input: string): Date {
  const value = impl.compact(input);

  return getBirthDateImpl(value);
}

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
