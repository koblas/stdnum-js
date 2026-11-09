import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('kh/passport', () => {
  it('format:N1234567', () => {
    const result = format('N1234567');

    expect(result).toEqual('N1234567');
  });

  test.each(['N1234567', 'N12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['N123456', '1111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
