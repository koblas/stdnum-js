import { validate, format } from './passport';
import { InvalidLength } from '../exceptions';

describe('lt/passport', () => {
  it('format:12345678', () => {
    const result = format('12345678');

    expect(result).toEqual('12345678');
  });

  test.each(['12345678', 'AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1234567', 'ABCD12345', '111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
