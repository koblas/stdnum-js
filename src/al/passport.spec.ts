import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('al/passport', () => {
  it('format:BG1234567', () => {
    const result = format('BG1234567');

    expect(result).toEqual('BG1234567');
  });

  test.each(['BG1234567', 'ZZ0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1G1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['B1234567', 'BG123456', '1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
