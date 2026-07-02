import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('vn/passport', () => {
  it('format:C1234567', () => {
    const result = format('C1234567');

    expect(result).toEqual('C1234567');
  });

  test.each(['C1234567', '123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['C123456', '1111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
