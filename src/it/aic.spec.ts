import { validate, format } from './aic';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('it/aic', () => {
  it('format:000307052', () => {
    const result = format('000307052');

    expect(result).toEqual('000307052');
  });

  it('validate:000307052', () => {
    const result = validate('000307052');

    expect(result.isValid && result.compact).toEqual('000307052');
  });

  it('validate:009CVD', () => {
    const result = validate('009CVD');

    expect(result.isValid && result.compact).toEqual('009CVD');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:000307053', () => {
    const result = validate('000307053');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:009CVE', () => {
    const result = validate('009CVW');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
