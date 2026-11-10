import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('li/passport', () => {
  it('format:R12345', () => {
    const result = format('R12345');

    expect(result).toEqual('R12345');
  });

  test.each(['R12345', 'A12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB12345', 'R1234', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
