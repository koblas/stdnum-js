/* eslint-disable max-classes-per-file */
/**
 * Collection of exceptions.
 * The validation functions of stdnum should raise one of the below exceptions
 * when validation of the number fails.
 */

/**
 * Top-level error for validating numbers.
 *
 * This exception should normally not be raised, only subclasses of this
 * exception.
 */
export class ValidationError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'ValidationError';
  }
}

/**
 *  Something is wrong with the format of the number.
 *
 *  This generally means characters or delimiters that are not allowed are
 *  part of the number or required parts are missing.
 */
export class InvalidFormat extends ValidationError {
  constructor(msg = 'The number has an invlidad format.') {
    super(msg);
    this.name = 'InvalidFormat';
  }
}

/**
 * The number's internal checksum or check digit does not match.
 */
export class InvalidChecksum extends ValidationError {
  constructor(msg = "The number number's checksum or check digit is invalid.") {
    super(msg);
    this.name = 'InvalidChecksum';
  }
}

/**
 * The length of the number is wrong
 */
export class InvalidLength extends ValidationError {
  constructor(msg = 'The number has an invalid length.') {
    super(msg);
    this.name = 'InvalidLength';
  }
}

/**
 * One of the parts of the number has an invalid reference.
 *
 * Some part of the number refers to some external entity like a country
 * code, a date or a predefined collection of values. The number contains
 * some invalid reference.
 */
export class InvalidComponent extends ValidationError {
  constructor(msg = 'One of the parts of the number are invalid or unknown.') {
    super(msg);
    this.name = 'InvalidComponent';
  }
}
