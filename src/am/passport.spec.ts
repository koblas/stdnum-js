import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('am/passport', () => {
  it('format:AN1234567', () => {
    const result = format('AN1234567');

    expect(result).toEqual('AN1234567');
  });

  test.each(['AN1234567', 'AB0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1N1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['A1234567', 'AN123456', '1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
