import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ws/passport', () => {
  it('format:T123456', () => {
    const result = format('T123456');

    expect(result).toEqual('T123456');
  });

  test.each(['T123456', 'T654321'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1234567', 'TA12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['11111111', '111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
