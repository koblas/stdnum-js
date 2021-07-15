export function iso7064mod10x11validate(value: string): boolean {
  const check = value
    .split('')
    .map(v => parseInt(v, 10))
    .reduce((acc, v) => ((((acc === 0 ? 10 : acc) * 2) % 11) + v) % 10, 5);

  return check === 1;
}
