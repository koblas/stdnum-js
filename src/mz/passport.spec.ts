import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('mz/passport', () => {
  it('format:AB1234567', () => {
    const result = format('AB1234567');

    expect(result).toEqual('AB1234567');
  });

  test.each(['AB1234567', 'MZ0009999'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A12345678', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('mz/passport other formats', () => {
  test.each(['AC123456', 'AB1234567'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});
