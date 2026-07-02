import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ee/passport', () => {
  it('format:K1234567', () => {
    const result = format('K1234567');

    expect(result).toEqual('K1234567');
  });

  test.each(['K1234567', 'A0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['11234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB1234567', 'K123456', '111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
