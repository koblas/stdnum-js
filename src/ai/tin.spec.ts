import { validate, format } from './tin';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('ai/tin', () => {
  it('format:12345-6789', () => {
    const result = format('123456789');

    expect(result).toEqual('12345-6789');
  });

  it('validate:12345-6789', () => {
    const result = validate('12345-6789');

    expect(result.isValid && result.compact).toEqual('123456789');
  });

  test.each([
    '123456789', // Valid format
    '12345-6789', // Valid format with hyphen
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

  it('validate:1234567890', () => {
    const result = validate('1234567890');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345A678', () => {
    const result = validate('12345A678');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  //   it('validate:123456788', () => {
  //     const result = validate('123456788');

  //     expect(result.error).toBeInstanceOf(InvalidChecksum);
  //   });
});
