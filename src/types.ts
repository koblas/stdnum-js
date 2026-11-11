import { ValidationError } from './exceptions';

interface ValidateSuccess {
  /**
   * ID Is Valid
   */
  isValid: true;

  /**
   * Compact version of the ID
   */
  compact: string;

  /**
   * This ID identifies an individual
   *
   * Note: An ID may not positivily identify an individual or entity
   */
  isIndividual: boolean;

  /**
   * This ID identifies an entity
   *
   * Note: An ID may not positivily identify an individual or entity
   */
  isCompany: boolean;
}

interface ValidateFail {
  /**
   * TIN is not valid
   */
  isValid: false;

  /**
   * The validation error
   */
  error: ValidationError;
}

export type ValidateReturn = { error?: ValidationError } & (
  ValidateSuccess | ValidateFail
);

export interface Validator {
  /**
   * The type of validation: ID, tin, vat, bank,
   */

  /**
   * The validator name, or ID's expansion name in English
   */
  name: string;

  /**
   * The validator name, or ID's expansion name its local name
   */
  localName: string;

  /**
   * The short/acronym or abbreviation of the validator
   */
  abbreviation?: string;

  /**
   * Valid example numbers in compact form, for documentation and as UI hints
   * (for example "Enter your TFN, e.g. 123 456 782").
   */
  examples?: string[];

  /**
   * The shapes of the format() output, in IBAN registry notation: `n` is a
   * digit, `a` an upper case letter (A-Z), `c` a digit or upper case letter,
   * and any other character is literal. A number that comes in several shapes
   * (such as different lengths) has one pattern per shape.
   */
  formats?: string[];

  /**
   * Convert the number to the minimal representation.
   * This strips the number of any valid separators and removes surrounding
   * whitespace.
   */
  compact(value: string): string;

  /**
   * Reformat the number to the standard presentation format.
   */
  format(value: string): string;

  /**
   * Validate with error throws subclass of ValidationError
   */
  validate(value: string): ValidateReturn;
}
