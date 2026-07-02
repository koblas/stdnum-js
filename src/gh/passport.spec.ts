import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('gh/passport', () => {
  it('format:G1234567', () => {
    const result = format('G1234567');

    expect(result).toEqual('G1234567');
  });

  test.each(['G1234567', 'AA123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['11234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB12345', '123456789', '111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
