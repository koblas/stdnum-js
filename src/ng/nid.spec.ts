import { validate, format } from './nid';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ng/nid', () => {
  it('format:12345678901', () => {
    const result = format('12345678901');

    expect(result).toEqual('12345678901');
  });

  test.each(['12345678901', '00000000000'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A2345678901'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1234567890', '123456789012', '111111111111'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );
});
