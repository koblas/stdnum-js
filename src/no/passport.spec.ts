import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('no/passport', () => {
  it('format:12345678', () => {
    const result = format('12345678');

    expect(result).toEqual('12345678');
  });

  test.each(['12345678', '30000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['111111111', '111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1234567', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('no/passport real-world formats', () => {
  test.each(['C1234567', 'FG1234567', '12345678'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});
