import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('jp/passport', () => {
  it('format:TR1234567', () => {
    const result = format('TR1234567');

    expect(result).toEqual('TR1234567');
  });

  test.each(['TR1234567', 'AB9876543'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1R1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['A1234567', 'TR123456', '1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
