import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('cy/passport', () => {
  it('format:K123456', () => {
    const result = format('K123456');

    expect(result).toEqual('K123456');
  });

  test.each(['K123456', 'L12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['KL123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['K12345', '1111111111', '111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
