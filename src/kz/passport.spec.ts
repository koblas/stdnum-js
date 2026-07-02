import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('kz/passport', () => {
  it('format:N12345678', () => {
    const result = format('N12345678');

    expect(result).toEqual('N12345678');
  });

  test.each(['N12345678', 'A1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['12345678', 'AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
