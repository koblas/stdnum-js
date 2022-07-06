const alphanumericRE = /^[A-Za-z0-9]+$/;
const digitRE = /^[0-9]+$/;
const alphaRE = /^[A-Za-z]+$/;

/**
 * Alpha numeric check A-Za-z0-9
 */
export function isalphanumeric(value: string): boolean {
  return alphanumericRE.test(value);
}

export function isdigits(value: string): boolean {
  return digitRE.test(value);
}

export function isalpha(value: string): boolean {
  return alphaRE.test(value);
}
