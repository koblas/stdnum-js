import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('tz/passport', () => {
  it('format:A1234567', () => {
    const result = format('A1234567');

    expect(result).toEqual('A1234567');
  });

  test.each(['A1234567', 'AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['11234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['A123456', 'AB1234567', '111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
