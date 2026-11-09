import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('fr/passport', () => {
  it('format:12AB34567', () => {
    const result = format('12AB34567');

    expect(result).toEqual('12AB34567');
  });

  test.each(['12AB34567', '09AB12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456789', 'AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
