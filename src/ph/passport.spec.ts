import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ph/passport', () => {
  it('format:AB1234567', () => {
    const result = format('AB1234567');

    expect(result).toEqual('AB1234567');
  });

  test.each(['AB1234567', 'A1234567B'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456789', '1111111111', '111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
