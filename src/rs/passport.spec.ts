import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('rs/passport', () => {
  it('format:008000000', () => {
    const result = format('008000000');

    expect(result).toEqual('008000000');
  });

  test.each(['008000000', '123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['12345678', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
