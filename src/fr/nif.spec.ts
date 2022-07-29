import { validate, format } from './nif';
import { InvalidChecksum, InvalidLength } from '../exceptions';

describe('fr/nif', () => {
  it('format:0701987765432', () => {
    const result = format('0701987765432');

    expect(result).toEqual('07 01 987 765 432');
  });

  it('validate:0701987765432', () => {
    const result = validate('0701987765432');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it.each(['0701987765493', '30 23 217 600 053'])('validate:%s', input =>
    expect(validate(input).isValid).toBeTruthy(),
  );
});
