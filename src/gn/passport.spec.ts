import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('gn/passport', () => {
  it('format:D12345678', () => {
    const result = format('D12345678');

    expect(result).toEqual('D12345678');
  });

  test.each(['D12345678', 'O00000000'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['123456789012345', 'D1234567', 'D123456789'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );
});
