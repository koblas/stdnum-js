/**
 * CUI (Código Único de Identificación, Guatemala identity number).
 *
 * The Código Único de Identificación (CUI) is an identifier for persons
 * that appears on the Documento Nacional de Identidad (DNI).
 *
 *
 * Source
 *    https://knowledge.sayari.com/hc/en-us/articles/360033290312-Guatemala-Interpreting-Guatemalan-National-ID-Numbers
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const citiesPerRegion: Record<string, number> = {
  /* Guatemala */ '01': 17,
  /* El Progreso */ '02': 8,
  /* Sacatepéquez */ '03': 16,
  /* Chimaltenango */ '04': 16,
  /* Escuintla */ '05': 13,
  /* Santa Rosa */ '06': 14,
  /* Sololá */ '07': 19,
  /* Totonicapán */ '08': 8,
  /* Quetzaltenango */ '09': 24,
  /* Suchitepéquez */ '10': 21,
  /* Retalhuleu */ '11': 9,
  /* San Marcos */ '12': 30,
  /* Huehuetenango */ '13': 32,
  /* Quiché */ '14': 21,
  /* Baja Verapaz */ '15': 8,
  /* Alta Verapaz */ '16': 17,
  /* Petén */ '17': 14,
  /* Izabal */ '18': 5,
  /* Zacapa */ '19': 11,
  /* Chiquimula */ '20': 11,
  /* Jalapa */ '21': 7,
  /* Jutiapa */ '22': 17,
};

const impl: Validator = {
  name: 'Guatemala Identity Number',
  localName: 'Código Único de Identificación',
  abbreviation: 'CUI',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 4, 9).join('-');
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
    const [front, check, region, city] = strings.splitAt(value, 8, 9, 11);

    const cities = citiesPerRegion[region];
    if (!cities) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (parseInt(city, 10) > cities) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const digit = String(
      weightedSum(front, {
        weights: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        modulus: 11,
      }) % 10,
    );

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
