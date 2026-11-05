import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('kn/passport', () => {
  it('format:R123456', () => {
    const result = format('R123456');

    expect(result).toEqual('R123456');
  });

  test.each(['R123456', 'A000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['RA12345', '1234567', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('kn/passport real-world formats', () => {
  test.each(['RE0124671', 'RE138611', 'A123456'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});
