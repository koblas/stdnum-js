import { validate, format } from './businessid';
import { InvalidFormat } from '../exceptions';

describe('at/businessid', () => {
  it('format:800280610', () => {
    const result = format('122119m');

    expect(result).toEqual('122119M');
  });

  it('validate:FN 122119m', () => {
    const result = validate('FN 122119m');

    expect(result.isValid && result.compact).toEqual('122119M');
  });

  it('validate:8765432-6', () => {
    const result = validate('122119m');

    expect(result.isValid && result.compact).toEqual('122119M');
  });

  it('validate:m122119', () => {
    const result = validate('m122119');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:abc', () => {
    const result = validate('abc');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
