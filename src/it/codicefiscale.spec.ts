import { validate, format } from './codicefiscale';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('it/codicefiscale', () => {
  it('format:RCCMNL83S18D969H', () => {
    const result = format('RCCMNL83S18D969H');

    expect(result).toEqual('RCCMNL83S18D969H');
  });

  it('validate:RCCMNL83S18D969H', () => {
    const result = validate('RCCMNL83S18D969H');

    expect(result.isValid && result.compact).toEqual('RCCMNL83S18D969H');
  });

  it('validate:01234560017', () => {
    const result = validate('01234560017');

    expect(result.isValid && result.compact).toEqual('01234560017');
    expect(result.isValid && result.isCompany).toBe(true);
  });

  it('validate:01234560018', () => {
    const result = validate('01234560018');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
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
