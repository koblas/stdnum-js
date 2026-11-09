import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ee/passport', () => {
  it('format:K1234567', () => {
    const result = format('K1234567');

    expect(result).toEqual('K1234567');
  });

  test.each(['K1234567', 'A0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['11234567', '111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['K123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('ee/passport other formats', () => {
  test.each(['KG1234567', 'K1234567'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});
