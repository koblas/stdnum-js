import { validate, format } from './ddv';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('si/ddv', () => {
  it('format:SI 5022 3054', () => {
    const result = format('SI 5022 3054');

    expect(result).toEqual('50223054');
  });

  // Valid check digit, but numbers do not start with 0
  it('validate:01234579', () => {
    const result = validate('01234579');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  // The weighted sum is 0 mod 11, so no check digit is valid
  it('validate:10000071', () => {
    const result = validate('10000071');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:SI 5022 3054', () => {
    const result = validate('SI 5022 3054');

    expect(result.isValid && result.compact).toEqual('50223054');
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:SI 5022 3053', () => {
    const result = validate('SI 5022 3053');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
