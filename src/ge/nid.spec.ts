import { validate, format } from './nid';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ge/nid', () => {
  it('format:01002035001', () => {
    const result = format('01002035001');

    expect(result).toEqual('01002035001');
  });

  test.each(['01002035001', '62001054231'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A1002035001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['0100203500', '010020350011', '111111111111'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );
});
