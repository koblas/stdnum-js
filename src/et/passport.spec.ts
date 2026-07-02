import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('et/passport', () => {
  it('format:E123456', () => {
    const result = format('E123456');

    expect(result).toEqual('E123456');
  });

  test.each(['E123456', 'EP1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1234567', 'AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1111111111', '111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
