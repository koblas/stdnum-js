import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('sg/passport', () => {
  it('format:E1234567X', () => {
    const result = format('E1234567X');

    expect(result).toEqual('E1234567X');
  });

  test.each(['E1234567X', 'K7654321Z'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['E12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
