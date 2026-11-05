import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('lc/passport', () => {
  it('format:A123456', () => {
    const result = format('A123456');

    expect(result).toEqual('A123456');
  });

  test.each(['A123456', 'C987654'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1123456', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['12345'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('lc/passport real-world formats', () => {
  test.each(['RA018981', 'A123456'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});
