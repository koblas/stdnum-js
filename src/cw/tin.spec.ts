import { validate, format } from './tin';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('cw/tin', () => {
  it('format:123456789', () => {
    const result = format('123456789');

    expect(result).toEqual('123456789');
  });

  test.each(['123456789', '100000002'])('validate:%s', value => {
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
});
