import { validate, format } from './nit';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('sv/nit', () => {
  it('format:06140507071048', () => {
    const result = format('06140507071048');

    expect(result).toEqual('0614-050707-104-8');
  });

  it('validate:0614-050707-104-8', () => {
    const result = validate('0614-050707-104-8');

    expect(result.isValid && result.compact).toEqual('06140507071048');
  });

  it('validate:SV 0614-050707-104-8', () => {
    const result = validate('SV 0614-050707-104-8');

    expect(result.isValid && result.compact).toEqual('06140507071048');
  });

  it('validate:1234567890123', () => {
    const result = validate('1234567890123');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:0614-050707-104-0', () => {
    const result = validate('0614-050707-104-0');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
