/**
 * NCF (Números de Comprobante Fiscal, Dominican Republic receipt number).
 *
 * The NCF is used to number invoices and other documents for the purpose of tax
 * filing. The e-CF (Comprobante Fiscal Electrónico) is used together with a
 * digital certificate for the same purpose. The number is either 19, 11 or 13
 * (e-CF) digits long.
 *
 * The 19 digit number starts wit a letter (A or P) to indicate that the number
 * was assigned by the taxpayer or the DGII, followed a 2-digit business unit
 * number, a 3-digit location number, a 3-digit mechanism identifier, a 2-digit
 * document type and a 8-digit serial number.
 *
 * The 11 digit number always starts with a B followed a 2-digit document type
 * and a 7-digit serial number.
 *
 * The 13 digit e-CF starts with an E followed a 2-digit document type and an
 * 8-digit serial number.
 *
 * Source
 *    https://www.dgii.gov.do/
 *    https://dgii.gov.do/workshopProveedoresTI-eCE/Documents/Norma05-19.pdf
 *    https://dgii.gov.do/cicloContribuyente/facturacion/comprobantesFiscales/Paginas/tiposComprobantes.aspx
 *
 * VAT ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

const ncfTypes = [
  '01', // invoices for fiscal declaration (or tax reporting)
  '02', // invoices for final consumer
  '03', // debit note
  '04', // credit note (refunds)
  '11', // informal supplier invoices (purchases)
  '12', // single income invoices
  '13', // minor expenses invoices (purchases)
  '14', // invoices for special customers (tourists, free zones)
  '15', // invoices for the government
  '16', // invoices for export
  '17', // invoices for payments abroad
];

const ecfTypes = [
  '31', // invoices for fiscal declaration (or tax reporting)
  '32', // invoices for final consumer
  '33', // debit note
  '34', // credit note (refunds)
  '41', // supplier invoices (purchases)
  '43', // minor expenses invoices (purchases)
  '44', // invoices for special customers (tourists, free zones)
  '45', // invoices for the government
  '46', // invoices for exports
  '47', // invoices for foreign payments
];

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'Dominican Republic Receipt Number',
  localName: 'Números de Comprobante Fiscal',
  abbreviation: 'NCF',
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
    if (value.length === 13) {
      if (!value.startsWith('E')) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!strings.isdigits(value.substr(1))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!ecfTypes.includes(value.substr(1, 2))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else if (value.length === 11) {
      if (!value.startsWith('B')) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!strings.isdigits(value.substr(1))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!ncfTypes.includes(value.substr(1, 2))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else if (value.length === 19) {
      if (!value.startsWith('AP')) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!strings.isdigits(value.substr(2))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!ncfTypes.includes(value.substr(9, 2))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else {
      return { isValid: false, error: new exceptions.InvalidLength() };
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
