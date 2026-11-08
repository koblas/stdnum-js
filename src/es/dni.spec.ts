import { validate, format } from './dni';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('es/dni', () => {
  it('format:54362315K', () => {
    const result = format('54362315K');

    expect(result).toEqual('54362315-K');
  });

  it('validate:54362315-K', () => {
    const result = validate('54362315-K');

    expect(result.isValid && result.compact).toEqual('54362315K');
  });

  it('validate:54362315', () => {
    const result = validate('54362315');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:54362315Z', () => {
    const result = validate('54362315Z');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // K, L and M prefixes use the DNI check letter on the 7 digits after them
  test.each(['K1234567L', 'L7654321J', 'M1234567L'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(value);
  });

  test.each(['K1234567A', 'L7654321G'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
