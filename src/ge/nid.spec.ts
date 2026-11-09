import { validate, format } from './nid';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ge/nid', () => {
  it('format:01234567890', () => {
    const result = format('01234567890');

    expect(result).toEqual('01234567890');
  });

  test.each(['01234567890', '98765432109'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A1234567890'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['0123456789', '012345678901', '111111111111'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );
});
