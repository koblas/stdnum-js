import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('li/passport', () => {
  it('format:R00536', () => {
    const result = format('R00536');

    expect(result).toEqual('R00536');
  });

  test.each(['R00536', 'A12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['100536'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB12345', 'R0053', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
