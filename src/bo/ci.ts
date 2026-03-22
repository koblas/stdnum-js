/**
 * CI - Cédula de Identidad (Bolivia)
 *
 * The Bolivian CI is a national identity document.
 * It consists of 7-8 digits followed by a department code and an optional extension.
 *
 * Format: XXXXXXX-DD-E or XXXXXXXX-DD-E
 * Where:
 * - X = digits (7 or 8)
 * - DD = department code (2 letters)
 * - E = extension (optional, 1-2 characters)
 *
 * Source: https://www.segip.gob.bo/
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

// Valid department codes for Bolivia
const VALID_DEPARTMENTS = [
  'LP', // La Paz
  'OR', // Oruro
  'PT', // Potosí
  'CB', // Cochabamba
  'CH', // Chuquisaca
  'TJ', // Tarija
  'SC', // Santa Cruz
  'BE', // Beni
  'PD', // Pando
];

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

const impl: Validator = {
  name: 'Bolivian National Identity Card',
  localName: 'Cédula de Identidad',
  abbreviation: 'CI',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    // Format: XXXXXXX-DD or XXXXXXX-DD-E
    const match = value.match(/^(\d{7,8})([A-Z]{2})(\w{0,2})$/);

    if (!match) {
      return value;
    }

    const [, number, dept, ext] = match;

    if (ext) {
      return `${number}-${dept}-${ext}`;
    }

    return `${number}-${dept}`;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }

    // Basic format check: must contain only alphanumeric characters
    if (!/^[A-Z0-9]+$/i.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    // More flexible initial match to extract parts
    const basicMatch = value.match(/^(\d+)(.*)$/);

    if (!basicMatch) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [, numberPart, rest] = basicMatch;

    // Validate number part length (7 or 8 digits)
    if (numberPart.length < 7 || numberPart.length > 8) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    // Check if we have at least department code
    if (rest.length < 2) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    // Extract department and extension
    const department = rest.substring(0, 2).toUpperCase();
    const extension = rest.substring(2);

    // Department must be letters only
    if (!/^[A-Z]{2}$/.test(department)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    // Validate department code
    if (!VALID_DEPARTMENTS.includes(department)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    // Validate extension if present (alphanumeric, max 2 chars)
    if (extension.length > 2) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (extension && !/^[A-Z0-9]+$/i.test(extension)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    // Final length check
    const totalLength =
      numberPart.length + department.length + extension.length;
    if (totalLength < 9 || totalLength > 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    return {
      isValid: true,
      compact: value.toUpperCase(),
      isIndividual: true,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
