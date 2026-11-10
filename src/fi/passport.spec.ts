import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('fi/passport', () => {
  it('format:AB1234567', () => {
    const result = format('AB1234567');

    expect(result).toEqual('AB1234567');
  });

  test.each(['AB1234567', 'XY9876543'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
