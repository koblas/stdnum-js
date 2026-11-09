import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('mx/passport', () => {
  it('format:G12345678', () => {
    const result = format('G12345678');

    expect(result).toEqual('G12345678');
  });

  test.each(['G12345678', 'J00000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['GG1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['12345678', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
