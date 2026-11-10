import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('tw/passport', () => {
  it('format:312345678', () => {
    const result = format('312345678');

    expect(result).toEqual('312345678');
  });

  test.each(['312345678', '123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456', '31234567', '1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
