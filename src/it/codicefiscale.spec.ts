import { validate, format } from './codicefiscale';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('it/codicefiscale', () => {
  it('format:RCCMNL83S18D969H', () => {
    const result = format('RCCMNL83S18D969H');

    expect(result).toEqual('RCCMNL83S18D969H');
  });

  it('validate:RCCMNL83S18D969H', () => {
    const result = validate('RCCMNL83S18D969H');

    expect(result.isValid && result.compact).toEqual('RCCMNL83S18D969H');
  });

  // Day + 40 for women
  it('validate:RCCMNL83S58D969L', () => {
    const result = validate('RCCMNL83S58D969L');

    expect(result.isValid && result.compact).toEqual('RCCMNL83S58D969L');
  });

  // Day 32
  it('validate:RCCMNL83S32D969V', () => {
    const result = validate('RCCMNL83S32D969V');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  // 30 February
  it('validate:RCCMNL83B30D969F', () => {
    const result = validate('RCCMNL83B30D969F');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  // Day 32 (+ 40)
  it('validate:RCCMNL83S72D969Z', () => {
    const result = validate('RCCMNL83S72D969Z');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:RCCMNL83S18D967H', () => {
    const result = validate('RCCMNL83S18D967H');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
