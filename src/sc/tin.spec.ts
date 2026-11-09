import { validate, format } from './tin';
import { InvalidLength, InvalidFormat, InvalidChecksum } from '../exceptions';

describe('sc/tin', () => {
  it('format:123456782', () => {
    const result = format('123456782');

    expect(result).toEqual('123456782');
  });

  // Made-up numbers with a valid checksum
  test.each([
    '123456782',
    '204060804',
    '876543210', // check digit 0
    '123 456 782',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(
      value.replace(/[ -]/g, ''),
    );
  });

  test.each(['12345678', '1234567890'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345678A', () => {
    const result = validate('12345678A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each([
    '123456789', // wrong check digit
    '987654321', // wrong check digit
    '987654320', // weighted sum is 10: never issued
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
