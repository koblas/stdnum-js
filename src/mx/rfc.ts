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
 * VAT
 */

import * as exceptions from "../exceptions";
import { cleanUnicode, isValidDateCompact, splitAt } from "../util";
import { Validator, ValidateReturn } from "../types";

function clean(input: string): ReturnType<typeof cleanUnicode> {
  return cleanUnicode(input, "-_ ");
}

const nameBlacklist = new Set([
  "BUEI",
  "BUEY",
  "CACA",
  "CACO",
  "CAGA",
  "CAGO",
  "CAKA",
  "CAKO",
  "COGE",
  "COJA",
  "COJE",
  "COJI",
  "COJO",
  "CULO",
  "FETO",
  "GUEY",
  "JOTO",
  "KACA",
  "KACO",
  "KAGA",
  "KAGO",
  "KAKA",
  "KOGE",
  "KOJO",
  "KULO",
  "MAME",
  "MAMO",
  "MEAR",
  "MEAS",
  "MEON",
  "MION",
  "MOCO",
  "MULA",
  "PEDA",
  "PEDO",
  "PENE",
  "PUTA",
  "PUTO",
  "QULO",
  "RATA",
  "RUIN",
]);

const checkAlphabet = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ";
const checkAlphabetDict: Record<string, number> = checkAlphabet
  .split("")
  .reduce((acc, c, idx) => ({ ...acc, [c]: idx }), {});

class RfcSingleton implements Validator {
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value.toLocaleUpperCase();
  }

  format(input: string): string {
    const value = this.compact(input);

    if (value.length === 12) {
      return splitAt(value, 3, 9).join(" ");
    } else if (value.length === 13) {
      return splitAt(value, 4, 10).join(" ");
    } else {
      return splitAt(value, 4).join(" ");
    }
  }

  /**
   * Check if the number is a valid Andorra NRT number.
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
      if (!isValidDateCompact(value.substr(4, 6))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else if (value.length === 12) {
      if (!/^[A-Z&Ñ]{3}[0-9]{6}[0-9A-Z]{3}$/.test(value)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!isValidDateCompact(value.substr(3, 6))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (value.length >= 12) {
      if (!/[1-9A-V][1-9A-V][0-9A]$/.test(value)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }

      const sum = value
        .substr(0, value.length - 1)
        .padStart(12, " ")
        .split("")
        .reduce((acc, c, idx) => acc + (checkAlphabetDict[c] ?? 0) * (13 - idx), 0);

      if (value[value.length - 1] !== String(11 - (sum % 11))) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: value.length !== 12,
      isCompany: value.length === 12,
    };
  }
}

export const Rfc = new RfcSingleton();
export const validate = Rfc.validate;
export const format = Rfc.format;
export const compact = Rfc.compact;
