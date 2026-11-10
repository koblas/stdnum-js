import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('az/passport', () => {
  it('format:X12345678', () => {
    const result = format('X12345678');

    expect(result).toEqual('X12345678');
  });

  test.each(['X12345678', 'AA1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456789', 'ABC123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
