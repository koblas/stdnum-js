import { validate, format } from './idno';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('md/idno', () => {
  it('format:1008600038413', () => {
    const result = format('1008600038413');

    expect(result).toEqual('1008600038413');
  });

  it('validate:1008600038413', () => {
    const result = validate('1008600038413');

    expect(result.isValid && result.compact).toEqual('1008600038413');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1008600038412', () => {
    const result = validate('1008600038412');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
