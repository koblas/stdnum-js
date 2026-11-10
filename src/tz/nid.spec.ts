import { validate, format } from './nid';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('tz/nid', () => {
  it('format:19850312123456789012', () => {
    const result = format('19850312123456789012');

    expect(result).toEqual('19850312123456789012');
  });

  test.each(['19850312123456789012', '20011130000123456789'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toBeTruthy();
    },
  );

  test.each(['ABCDEFGHIJKLMNOPQRST'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1234567890', '1985031212345678901', '111111111111111111111'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );
});
