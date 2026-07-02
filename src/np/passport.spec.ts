import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('np/passport', () => {
  it('format:08446992', () => {
    const result = format('08446992');

    expect(result).toEqual('08446992');
  });

  test.each(['08446992', '11919230'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['PA123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1234567', '111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
