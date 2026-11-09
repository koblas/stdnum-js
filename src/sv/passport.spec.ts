import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('sv/passport', () => {
  it('format:A123456', () => {
    const result = format('A123456');

    expect(result).toEqual('A123456');
  });

  test.each(['A123456', 'B000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1123456', 'AB123456', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['A12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('sv/passport other formats', () => {
  test.each(['C12345678', 'A123456'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});
