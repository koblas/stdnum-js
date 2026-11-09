import { validate, format } from './tin';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('gd/tin', () => {
  it('format:123456', () => {
    const result = format('123456');

    expect(result).toEqual('123456');
  });

  test.each(['123456', '000123'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(
      value.replace(/[ -]/g, ''),
    );
  });

  test.each(['12345', '1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345A', () => {
    const result = validate('12345A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
