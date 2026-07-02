import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ht/passport', () => {
  it('format:RL123456', () => {
    const result = format('RL123456');

    expect(result).toEqual('RL123456');
  });

  test.each(['RL123456', 'TA000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['R1234567', 'RLA12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
