import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ve/passport', () => {
  it('format:123456789', () => {
    const result = format('123456789');

    expect(result).toEqual('123456789');
  });

  test.each(['123456789', '01234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1234567', '1111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
