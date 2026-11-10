import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('gy/passport', () => {
  it('format:R1234567', () => {
    const result = format('R1234567');

    expect(result).toEqual('R1234567');
  });

  test.each(['R1234567', 'A0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['11234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['ABCDEF123456', 'R123456', '111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
