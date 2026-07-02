import { validate, format } from './tin';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('fj/tin', () => {
  it('format:115725203', () => {
    const result = format('115725203');

    expect(result).toEqual('115725203');
  });

  test.each(['115725203', '2912345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['11572520A'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['12345678', '290123456789', '11111111111'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );
});
