/**
 * NSS (El número de Seguridad Social, Social Security Number).
 *
 * The SSN is a tax identification number for individuals entities. It has 12 digits
 * where where the first 2 digits indicate province, followed by 8 digits and
 * a 2 digit checksum
 *
 * Sources:
 *   https://cis.ier.hit-u.ac.jp/English/society/conference1001/delgado-paper.pdf
 *   https://www.grupoalquerque.es/ferias/2012/archivos/digitos/codigo_seguridad_social.pdf
 *
 * TAX/PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

const PROVINCES = {
  ÁLAVA: '01',
  ALBACETE: '02',
  ALICANTE: '03',
  ALMERÍA: '04',
  ASTURIAS: '33',
  ÁVILA: '05',
  BADAJOZ: '06',
  BALEARES: '07',
  BARCELONA: '08',
  BURGOS: '09',
  CÁCERES: '10',
  CÁDIZ: '11',
  CANTABRIA: '39',
  CASTELLÓN: '12',
  'CIUDAD REAL': '13',
  CÓRDOBA: '14',
  CORUÑA: '15',
  CUENCA: '16',
  GERONA: '17',
  GRANADA: '18',
  GUADALAJARA: '19',
  GUIPÚZCOA: '20',
  HUELVA: '21',
  HUESCA: '22',
  JAÉN: '23',
  LEÓN: '24',
  LÉRIDA: '25',
  LUGO: '27',
  MADRID: '28',
  MÁLAGA: '29',
  MURCIA: '30',
  NAVARRA: '31',
  ORENSE: '32',
  PALENCIA: '34',
  'PALMAS (LAS)': '35',
  PONTEVEDRA: '36',
  'RIOJA (LA)': '26',
  SALAMANCA: '37',
  'SANTA CRUZ DE TENERIFE': '38',
  SEGOVIA: '40',
  SEVILLA: '41',
  SORIA: '42',
  TARRAGONA: '43',
  TERUEL: '44',
  TOLEDO: '45',
  VALENCIA: '46',
  VALLADOLID: '47',
  VIZCAYA: '48',
  ZAMORA: '49',
  ZARAGOZA: '50',
  'OTROS TERRITORIOS': '53',
  EXTRANJERO: '66',
};
const VALID_PROVINCES = Object.values(PROVINCES);

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -/');
}

const impl: Validator = {
  name: 'Spanish Social Security Number',
  localName: 'Número de Seguridad Social',
  abbreviation: 'NSS',
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

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [province, body, check] = strings.splitAt(value, 2, 10);
    if (!VALID_PROVINCES.includes(province)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (parseInt(province + body, 10) % 97 !== parseInt(check, 10)) {
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
