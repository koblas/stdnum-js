import { validate, format } from './ird';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('nz/ird', () => {
  it('format:4909185-0', () => {
    const result = format('4909185-0');

    expect(result).toEqual('49-091-850');
  });

  it('validate:4909185-0', () => {
    const result = validate('4909185-0');

    expect(result.isValid && result.compact).toEqual('49091850');
  });

  it('validate:NZ 4909185-0', () => {
    const result = validate('NZ 4909185-0');

    expect(result.isValid && result.compact).toEqual('49091850');
  });

  it('validate:123478', () => {
    const result = validate('123478');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:136410133', () => {
    const result = validate('136410133');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
