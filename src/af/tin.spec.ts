import { validate, format } from './tin';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('af/tin', () => {
  it('format:1234567890', () => {
    const result = format('1234567890');

    expect(result).toEqual('1234567890');
  });

  test.each(['1234567890', '9000000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(
      value.replace(/[ -]/g, ''),
    );
  });

  test.each(['123456789', '12345678901'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:123456789A', () => {
    const result = validate('123456789A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
