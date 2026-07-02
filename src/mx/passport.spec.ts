import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('mx/passport', () => {
  it('format:G20693408', () => {
    const result = format('G20693408');

    expect(result).toEqual('G20693408');
  });

  test.each(['G20693408', 'J00000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['GG2069340'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['20693408', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
