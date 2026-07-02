import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ua/passport', () => {
  it('format:FC123456', () => {
    const result = format('FC123456');

    expect(result).toEqual('FC123456');
  });

  test.each(['FC123456', 'AB000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['F1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['ABC123456', '111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
