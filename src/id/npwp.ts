/**
 * NPWP (Nomor Pokok Wajib Pajak, Indonesian VAT Number).
 *
 * The Nomor Pokok Wajib Pajak (NPWP) is assigned to organisations and
 * individuals (families) by the Indonesian Tax Office after registration by the
 * tax payers.
 *
 * The number consists of 15 digits of which the first 2 denote the type of
 * entity, 6 digits to identify the tax payer, a check digit over the first 8
 * digits followed by 3 digits to identify the local tax office and 3 digits for
 * branch code.
 *
 * Since 2024 the NPWP has 16 digits: for Indonesian citizens it is their NIK
 * (Nomor Induk Kependudukan), for others it is the old 15 digit number with a
 * leading 0.
 *
 * The first 2 digits are not checked against a list of known entity types:
 * the published lists are incomplete, and real numbers use prefixes (such as
 * 03, 66, 75 and 90) that they leave out.
 *
 * Source
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Indonesia-TIN.pdf
 *   https://metacpan.org/pod/Business::ID::NPWP
 *   https://wiki.scn.sap.com/wiki/display/CRM/Indonesia
 *   https://www.grantthornton.co.id/insights/global-insights1/updates-regarding-the-format-of-indonesian-tax-id-numbers/
 *   https://github.com/arthurdejong/python-stdnum/commit/e951dac
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';
import * as nik from './nik';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

const impl: Validator = {
  name: 'Indonesian VAT Number',
  localName: 'Nomor Pokok Wajib Pajak',
  abbreviation: 'NPWP',
  examples: ['013000666091000', '0016090524017000'],
  formats: ['nn.nnn.nnn.n-nnn.nnn', 'nnnnnnnnnnnnnnnn'],
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);
    if (value.length === 16) {
      return value;
    }

    const [a, b, c, d, e, f] = strings.splitAt(value, 2, 5, 8, 9, 12);

    return `${a}.${b}.${c}.${d}-${e}.${f}`;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 15 && value.length !== 16) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (value.length === 16 && value[0] !== '0') {
      // Indonesian citizens use their NIK
      const result = nik.validate(value);

      return result.isValid ? { ...result, isIndividual: true } : result;
    }

    // The 16 digit form of the old number has a leading 0
    const old = value.length === 16 ? value.slice(1) : value;
    if (!luhnChecksumValidate(old.slice(0, 9))) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: true,
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
