import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ws/passport', () => {
  it('format:T161001', () => {
    const result = format('T161001');

    expect(result).toEqual('T161001');
  });

  test.each(['T161001', 'T058402'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1610010', 'TA61001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['11111111', '111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
