import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('gd/passport', () => {
  it('format:A123456', () => {
    const result = format('A123456');

    expect(result).toEqual('A123456');
  });

  test.each(['A123456', 'R987654'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456', '11111111', '111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
