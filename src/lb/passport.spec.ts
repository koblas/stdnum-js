import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('lb/passport', () => {
  it('format:LR1234567', () => {
    const result = format('LR1234567');

    expect(result).toEqual('LR1234567');
  });

  test.each(['LR1234567', '123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['L12345678', 'L123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB12345678', '1111111111', '11111', 'LR123456'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );
});
