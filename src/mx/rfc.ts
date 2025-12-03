/**
 * RFC (Registro Federal de Contribuyentes, Mexican tax number).
 *
 * This number is used to identify individuals and companies for tax purposes.
 *
 * The company number is 12 digits where the first 3 letters or digits are
 * derived from the name of the company, the following 6 contain the date of
 * incorporation, followed by 3 check digits.
 *
 * Personal numbers consist of 13 digits where the first 4 characters from the
 * person's name, followed by their birth date and 3 check digits.
 *
 * The first two check digits are calculated based on the person's or company's
 * full name. The last check digit is calculated over all the preceding digits
 * in the number. However, it seems a lot of numbers (estimated at around 1.5%
 * of all numbers) are in use with invalid check digits so this test is disabled
 * by default.
 *
 * More information:
 *
 * https://www.infomex.org.mx/jspsi/documentos/2005/seguimiento/06101/0610100162005_065.doc
 * https://es.wikipedia.org/wiki/Registro_Federal_de_Contribuyentes_(M%C3%A9xico)
 *
 * An online validation service is available at:
 *
 * https://portalsat.plataforma.sat.gob.mx/ConsultaRFC/
 *
 * VAT  PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYMMDD, strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, '-_ ');
}

const nameBlacklist = new Set([
  'BUEI',
  'BUEY',
  'CACA',
  'CACO',
  'CAGA',
  'CAGO',
  'CAKA',
  'CAKO',
  'COGE',
  'COJA',
  'COJE',
  'COJI',
  'COJO',
  'CULO',
  'FETO',
  'GUEY',
  'JOTO',
  'KACA',
  'KACO',
  'KAGA',
  'KAGO',
  'KAKA',
  'KOGE',
  'KOJO',
  'KULO',
  'MAME',
  'MAMO',
  'MEAR',
  'MEAS',
  'MEON',
  'MION',
  'MOCO',
  'MULA',
  'PEDA',
  'PEDO',
  'PENE',
  'PUTA',
  'PUTO',
  'QULO',
  'RATA',
  'RUIN',
]);

// Official alphabet per SAT (Anexo 20). Includes '&' and 'Ñ'.
const checkAlphabet = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ';

// Legacy alphabet (Base 36) used in older systems.
// It excludes '&' and 'Ñ'. Space is added to support padding for companies.
const checkAlphabetLegacy = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ ';

const impl: Validator = {
  name: 'Mexican Tax Number',
  localName: 'Registro Federal de Contribuyentes',
  abbreviation: 'RFC',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value.toLocaleUpperCase();
  },

  format(input: string): string {
    const [value] = clean(input);

    if (value.length === 12) {
      return strings.splitAt(value, 3, 9).join(' ');
    }
    if (value.length === 13) {
      return strings.splitAt(value, 4, 10).join(' ');
    }
    return strings.splitAt(value, 4).join(' ');
  },

  /**
   * Check if the number is a valid RFC number.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length === 10 || value.length === 13) {
      if (!/^[A-Z&Ñ]{4}[0-9]{6}([0-9A-Z]{3})?$/.test(value)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (nameBlacklist.has(value.substr(0, 4))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!isValidDateCompactYYMMDD(value.substr(4, 6), true)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else if (value.length === 12) {
      if (!/^[A-Z&Ñ]{3}[0-9]{6}[0-9A-Z]{3}$/.test(value)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!isValidDateCompactYYMMDD(value.substr(3, 6))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (value.length >= 12) {
      if (!/[1-9A-V][1-9A-Z][0-9A]$/.test(value)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }

      const [front, check] = strings.splitAt(value, -1);
      const paddedInput = front.padStart(12, ' ');

      const calculateChecksum = (alphabet: string) => {
        const sum = weightedSum(paddedInput, {
          modulus: 11,
          alphabet: alphabet,
          weights: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
          reverse: true,
        });

        const mod = 11 - (sum % 11);
        if (mod === 11) return '0';
        if (mod === 10) return 'A';
        return String(mod);
      };

      // Try with official SAT alphabet first
      const valOfficial = calculateChecksum(checkAlphabet);

      if (check !== valOfficial) {
        // If it fails, try with Legacy alphabet (Base 36)
        // This handles older RFCs generated without '&' or 'Ñ' support
        const valLegacy = calculateChecksum(checkAlphabetLegacy);

        if (check !== valLegacy) {
          return { isValid: false, error: new exceptions.InvalidChecksum() };
        }
      }
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: value.length !== 12,
      isCompany: value.length === 12,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;