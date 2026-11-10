import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('dz/passport', () => {
  it('format:123456789', () => {
    const result = format('123456789');

    expect(result).toEqual('123456789');
  });

  test.each(['123456789', '987654321'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AS0123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
