import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('gb/passport', () => {
  it('format:987654321', () => {
    const result = format('987654321');

    expect(result).toEqual('987654321');
  });

  test.each(['987654321', '123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['12345678', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
