import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('sm/passport', () => {
  it('format:123456', () => {
    const result = format('123456');

    expect(result).toEqual('123456');
  });

  test.each(['123456', '987654'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A23456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456', '1234567', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
