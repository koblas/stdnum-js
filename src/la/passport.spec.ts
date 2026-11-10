import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('la/passport', () => {
  it('format:P1234567', () => {
    const result = format('P1234567');

    expect(result).toEqual('P1234567');
  });

  test.each(['P1234567', 'A0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['123456789', '111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
