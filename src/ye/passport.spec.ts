import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ye/passport', () => {
  it('format:01234567', () => {
    const result = format('01234567');

    expect(result).toEqual('01234567');
  });

  test.each(['01234567', '08765432'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['0123456', '111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
