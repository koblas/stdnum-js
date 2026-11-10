import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('lk/passport', () => {
  it('format:N1234567', () => {
    const result = format('N1234567');

    expect(result).toEqual('N1234567');
  });

  test.each(['N1234567', 'OL123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['11234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['N123456', '111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
