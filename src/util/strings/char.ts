const alphanumericRE = /^[A-Za-z0-9]+$/;
const digitRE = /^[0-9]+$/;
const alphaRE = /^[A-Za-z]+$/;

/**
 * Alpha numeric check A-Za-z0-9
 */
export function isAlphanumeric(value: string): boolean {
  return alphanumericRE.test(value);
}

export function isDigits(value: string): boolean {
  return digitRE.test(value);
}

export function isAlpha(value: string): boolean {
  return alphaRE.test(value);
}
