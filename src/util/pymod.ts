///
// Match pythons handling of negative modulus math  (e.g. -1 % 7 === 6)
//
//  https://stackoverflow.com/questions/41239190/result-of-17-is-different-in-javascript-1-and-python6
//
export function pymod(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus;
}
