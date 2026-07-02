import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('bz/passport', () => {
  it('format:PA123456', () => {
    const result = format('PA123456');

    expect(result).toEqual('PA123456');
  });

  test.each(['PA123456', 'BZ654321'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['P1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB12345', '111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
