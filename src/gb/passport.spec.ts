import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('gb/passport', () => {
  it('format:925665416', () => {
    const result = format('925665416');

    expect(result).toEqual('925665416');
  });

  test.each(['925665416', '123456789'])('validate:%s', value => {
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
