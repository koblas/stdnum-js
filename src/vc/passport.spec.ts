import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('vc/passport', () => {
  it('format:RA01234567', () => {
    const result = format('RA01234567');

    expect(result).toEqual('RA01234567');
  });

  test.each(['RA01234567', 'AB99887766'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1A01234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['A123456', 'RA0123456', '11111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
