import { validate, format } from './nid';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('np/nid', () => {
  it('format:1234567890', () => {
    const result = format('1234567890');

    expect(result).toEqual('1234567890');
  });

  test.each(['1234567890', '9876543210'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A234567890'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['123456789', '12345678901', '11111111111'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );
});
