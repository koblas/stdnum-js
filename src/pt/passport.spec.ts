import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('pt/passport', () => {
  it('format:A123456', () => {
    const result = format('A123456');

    expect(result).toEqual('A123456');
  });

  test.each(['A123456', 'Z000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB12345', '1234567', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('pt/passport other formats', () => {
  test.each(['CB123456', 'A123456'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});
