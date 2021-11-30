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
  | ValidateSuccess
  | ValidateFail
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
