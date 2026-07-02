import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('br/passport', () => {
  it('format:FA123456', () => {
    const result = format('FA123456');

    expect(result).toEqual('FA123456');
  });

  test.each(['FA123456', 'BR000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['F1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['FA12345', '111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
