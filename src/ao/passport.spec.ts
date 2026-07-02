import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ao/passport', () => {
  it('format:N1473613', () => {
    const result = format('N1473613');

    expect(result).toEqual('N1473613');
  });

  test.each(['N1473613', 'D0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['11473613'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['NN1234567', 'N123456', '111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
