import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('it/passport', () => {
  it('format:AA1234567', () => {
    const result = format('AA1234567');

    expect(result).toEqual('AA1234567');
  });

  test.each(['AA1234567', '1A1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AAA123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['A1234567', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
