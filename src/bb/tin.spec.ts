import { validate, format } from './tin';
import { InvalidLength, InvalidFormat, InvalidComponent } from '../exceptions';

describe('bb/tin', () => {
  it('format:1000000000001', () => {
    const result = format('1000000000001');

    expect(result).toEqual('1000000000001');
  });

  test.each(['1000000000001', '1234567890123'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(
      value.replace(/[ -]/g, ''),
    );
  });

  test.each(['123456789012', '12345678901234'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:100000000000A', () => {
    const result = validate('100000000000A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['2234567890123'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});
