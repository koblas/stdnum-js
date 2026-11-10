import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('za/passport', () => {
  it('format:A12345678', () => {
    const result = format('A12345678');

    expect(result).toEqual('A12345678');
  });

  test.each(['A12345678', 'M00045678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['112345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456', 'A1234567', '1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
