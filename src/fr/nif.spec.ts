import { validate, format } from './nif';
import { InvalidLength } from '../exceptions';

describe('fr/nif', () => {
  it('format:0701987765432', () => {
    const result = format('0701987765432');

    expect(result).toEqual('07 01 987 765 432');
  });

  it('validate:0701987765432', () => {
    const result = validate('0701987765432');

    expect(result.isValid && result.compact).toEqual('0701987765432');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
