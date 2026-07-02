import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('in/passport', () => {
  it('format:K1234567', () => {
    const result = format('K1234567');

    expect(result).toEqual('K1234567');
  });

  test.each(['K1234567', 'A9876543'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['K123456', '111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
