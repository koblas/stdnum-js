import { validate, format } from './nif';
import { InvalidLength } from '../exceptions';

describe('fr/nif', () => {
  it('format:0701987765432', () => {
    const result = format('0701987765432');

    expect(result).toEqual('07 01 987 765 432');
  });

  it('validate:3023217600053', () => {
    const result = validate('302 321 7600 053');

    expect(result.isValid && result.compact).toEqual('3023217600053');
  });

  it('validate:0701987765432', () => {
    const result = validate('0701987765493');

    expect(result.isValid && result.compact).toEqual('0701987765493');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
