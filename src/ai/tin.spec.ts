import { validate, format } from './tin';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('ai/tin', () => {
  it('format:12345-67890', () => {
    const result = format('1234567890');

    expect(result).toEqual('12345-67890');
  });

  it('validate:12345-67890', () => {
    const result = validate('12345-67890');

    expect(result.isValid && result.compact).toEqual('1234567890');
  });

  test.each([
    '1234567890', // Valid format
    '12345-67890', // Valid format with hyphen
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:3234567890', () => {
    const result = validate('3234567890');
    expect(result.isValid).toEqual(false);
  });

  it('validate:123456789', () => {
    const result = validate('123456789');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345A6789', () => {
    const result = validate('12345A6789');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  //   it('validate:123456788', () => {
  //     const result = validate('123456788');

  //     expect(result.error).toBeInstanceOf(InvalidChecksum);
  //   });
});
