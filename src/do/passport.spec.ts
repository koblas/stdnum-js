import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('do/passport', () => {
  it('format:SD1234567', () => {
    const result = format('SD1234567');

    expect(result).toEqual('SD1234567');
  });

  test.each(['SD1234567', 'PP7654321'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1D1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['SD123456', 'S1234567', '1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
