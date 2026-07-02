import { validate, format } from './passport';
import { InvalidLength } from '../exceptions';

describe('lu/passport', () => {
  it('format:JC4E7L2H', () => {
    const result = format('JC4E7L2H');

    expect(result).toEqual('JC4E7L2H');
  });

  test.each(['JC4E7L2H', 'AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['ABCDEFGHI', '111111111', '111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
