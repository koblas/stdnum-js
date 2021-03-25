import { validate, format } from './tva';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('lu/tva', () => {
  it('format:LU 150 274 42', () => {
    const result = format('15027442');

    expect(result).toEqual('150 274 42');
  });

  it('validate:LU 150 274 42', () => {
    const result = validate('LU 150 274 42');

    expect(result.isValid && result.compact).toEqual('15027442');
  });

  it('validate:123456789', () => {
    const result = validate('123456789');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:LU 150 274 43', () => {
    const result = validate('LU 150 274 43');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
