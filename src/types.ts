import { ValidationError } from './exceptions';

interface ValidateSuccess {
  /**
   * TIN Is Valid
   */
  isValid: true;

  /**
   * Compact version of the TIN
   */
  compact: string;

  /**
   * This TIN identifies an individual
   *
   * Note: A TIN may not positivily identify an individual or entity
   */
  isIndividual: boolean;

  /**
   * This TIN identifies an entity
   *
   * Note: A TIN may not positivily identify an individual or entity
   */
  isEntity: boolean;
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
   * The type of validation: tin, vat, bank,
   */

  /**
   * The validator name, or TIN's expansion name in English
   */
  name: string;

  /**
   * The validator name, or TIN's expansion name its local name
   */
  localizedName: string;

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
