import { validate, format } from './passport';
import { InvalidLength } from '../exceptions';

describe('ec/passport', () => {
  it('format:A12345678', () => {
    const result = format('A12345678');

    expect(result).toEqual('A12345678');
  });

  test.each(['A12345678', 'AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A1234567', 'A123456789', '1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
