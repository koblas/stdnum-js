const alphaRE = /^[A-Za-z0-9]+$/;
const digitRE = /^[0-9]+$/;

/**
 * Alpha numeric check A-Za-z0-9
 */
export function isalpha(value: string): boolean {
  return alphaRE.test(value);
}

export function isdigits(value: string): boolean {
  return digitRE.test(value);
}
