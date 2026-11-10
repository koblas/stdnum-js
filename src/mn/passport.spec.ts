import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('mn/passport', () => {
  it('format:AB1234567', () => {
    const result = format('AB1234567');

    expect(result).toEqual('AB1234567');
  });

  test.each(['AB1234567', 'EA0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['A1234567', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
