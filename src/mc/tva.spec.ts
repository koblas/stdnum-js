import { validate, format } from './tva';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('mc/tva', () => {
  it('format:53 0000 04605', () => {
    const result = format('53 0000 04605');

    expect(result).toEqual('53000004605');
  });

  it('validate:53 0000 04605', () => {
    const result = validate('53 0000 04605');

    expect(result.isValid && result.compact).toEqual('53000004605');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:FR 61 954 506 077', () => {
    const result = validate('FR 61 954 506 077');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});
