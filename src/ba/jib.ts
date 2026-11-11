/**
 * JIB (Bosnia and Herzegovina unique identification number of taxpayers).
 *
 * The JIB (Jedinstveni identifikacioni broj, also ID broj) is the 13 digit
 * tax number of legal entities, branches and sole proprietors. The first
 * digits give the type of taxpayer:
 *
 *   41       registered by the Indirect Taxation Authority (UIO)
 *   42       legal entity (Federation of BiH)
 *   43       sole proprietor (Federation of BiH)
 *   44       legal entity (Republika Srpska)
 *   45       sole proprietor (Republika Srpska)
 *   46       Brčko District company or branch
 *   48       branch of a non-resident (Federation of BiH)
 *   494-497  representative offices, non-residents, apartment owners'
 *            associations and other Republika Srpska registrations
 *   500-504  non-residents (Federation of BiH)
 *   6        embassies, missions and international organisations
 *
 * Positions 10-12 are 000 for the main unit and 001-999 for branches. The
 * 13th digit is a modulo 11 check digit over the whole number. The rulebooks
 * don't publish the weights; the ones used here (7, 6, 5, 4, 3, 2 repeated)
 * match 4,799 of 4,800 numbers published in government and business registers.
 * A remainder of 1 gives check digit 0, and numbers with remainder 0 are not
 * issued. The check digit is only verified for the prefixes those numbers
 * cover (42-46, 48 and 49x); for 41, 5xx and 6 only the structure is checked.
 *
 * The 12 digit VAT (PDV) number is the JIB without its leading 4 (see ba/vat).
 *
 * Sources
 *   https://feb.ba/wp-content/uploads/2025/10/a1c56-pravilnik-o-dodjeljivanju-id-brojeva-precisceni-novi-79-25.pdf
 *   https://www.poreskaupravars.org/dokumenti/pravilnici/Pravilnik-o-registraciji-identifikaciji-poreskih-obveznika-SLGL-104_03.pdf
 *   https://www.uino.gov.ba/portal/wp-content/uploads/PROPISI/2_Porezi/1_PDV/2_Pravilnici/B/B-2-Pravilnik-o-registraciji-i-upisu-u-Jedinstveni-registar-obveznika-indirektnih-poreza-Sluzbeni-glasnik-BiH-broj-5112b.pdf
 *   https://lookuptax.com/docs/tax-identification-number/bosnia-and-herzegovina-tax-id-guide
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./');
}

// Prefixes whose check digit is confirmed against published numbers
const CHECKED_PREFIXES = ['42', '43', '44', '45', '46', '48', '49'];

function isValidPrefix(value: string): boolean {
  if (value[0] === '4') {
    if (value[1] === '9') {
      return ['494', '495', '496', '497'].includes(value.substring(0, 3));
    }
    return ['41', '42', '43', '44', '45', '46', '48'].includes(
      value.substring(0, 2),
    );
  }
  if (value[0] === '5') {
    return ['500', '501', '502', '503', '504'].includes(value.substring(0, 3));
  }

  return value[0] === '6';
}

/**
 * Compute the check digit for the first 12 digits of a JIB. Returns null
 * when the remainder is 0, as no number is issued with that remainder.
 */
export function calcCheckDigit(value: string): string | null {
  const remainder = weightedSum(value.substring(0, 12), {
    weights: [7, 6, 5, 4, 3, 2],
    modulus: 11,
  });

  if (remainder === 0) {
    return null;
  }

  return String((11 - remainder) % 10);
}

const impl: Validator = {
  name: 'Bosnia and Herzegovina Unique Identification Number',
  localName: 'Jedinstveni identifikacioni broj',
  abbreviation: 'JIB',
  examples: ['4200211100005'],
  formats: ['nnnnnnnnnnnnn'],

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
    if (!isValidPrefix(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (
      CHECKED_PREFIXES.includes(value.substring(0, 2)) &&
      calcCheckDigit(value) !== value[12]
    ) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    // 41 (UIO, farmers and foreign persons), 43 and 45 (sole proprietors)
    // are individuals
    const isIndividual = ['41', '43', '45'].includes(value.substring(0, 2));

    return {
      isValid: true,
      compact: value,
      isIndividual,
      isCompany: !isIndividual,
    };
  },
};

export const {
  name,
  localName,
  abbreviation,
  examples,
  formats,
  validate,
  format,
  compact,
} = impl;
