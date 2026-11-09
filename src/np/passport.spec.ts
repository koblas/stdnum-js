import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('np/passport', () => {
  it('format:08123456', () => {
    const result = format('08123456');

    expect(result).toEqual('08123456');
  });

  test.each(['08123456', '11234567'])('validate:%s', value => {
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
