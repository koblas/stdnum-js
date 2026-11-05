import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('gn/passport', () => {
  it('format:D00003001', () => {
    const result = format('D00003001');

    expect(result).toEqual('D00003001');
  });

  test.each(['D00003001', 'O00000000'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB0000300'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['186100101190310', 'D0000300', 'D000030011'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );
});
