import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ad/passport', () => {
  it('format:O1234567', () => {
    const result = format('O1234567');

    expect(result).toEqual('O1234567');
  });

  test.each(['O1234567', 'A0598881'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['O123456', '111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
