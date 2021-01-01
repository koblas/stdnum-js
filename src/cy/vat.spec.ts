import { validate, format } from './vat';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('cy/vat', () => {
  it('format:CY-10259033P', () => {
    const result = format('CY-10259033P');

    expect(result).toEqual('10259033P');
  });

  it('validate:CY-10259033P', () => {
    const result = validate('CY-10259033P');

    expect(result.isValid && result.compact).toEqual('10259033P');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:CY-10259033Z', () => {
    const result = validate('CY-10259033Z');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
