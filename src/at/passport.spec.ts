import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('at/passport', () => {
  it('format:A1234567', () => {
    const result = format('A1234567');

    expect(result).toEqual('A1234567');
  });

  test.each(['A1234567', 'P7654321'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456', '12345678', '111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('at/passport other formats', () => {
  test.each(['AP1234567', 'A1234567'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});
