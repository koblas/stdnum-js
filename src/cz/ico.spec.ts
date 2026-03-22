import { validate, format } from './ico';
import { InvalidLength, InvalidChecksum, InvalidComponent } from '../exceptions';

describe('cz/ico', () => {
  it('format:25596641', () => {
    const result = format('25596641');

    expect(result).toEqual('25596641');
  });

  it('validate:25596641 (Avast Software)', () => {
    const result = validate('25596641');

    expect(result.isValid && result.compact).toEqual('25596641');
  });

  it('validate:27082440 (Alza.cz)', () => {
    const result = validate('27082440');

    expect(result.isValid && result.compact).toEqual('27082440');
  });

  it('validate:45274649 (Škoda Auto)', () => {
    const result = validate('45274649');

    expect(result.isValid && result.compact).toEqual('45274649');
  });

  it('validate:00023205 (ČEZ)', () => {
    const result = validate('00023205');

    expect(result.isValid && result.compact).toEqual('00023205');
  });

  it('validate:00075370 (ČSÚ)', () => {
    const result = validate('00075370');

    expect(result.isValid && result.compact).toEqual('00075370');
  });

  it('validate:12345678 (invalid checksum)', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:1234567 (too short)', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:90000001 (reserved range)', () => {
    const result = validate('90000001');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate with spaces: 255 96 641', () => {
    const result = validate('255 96 641');

    expect(result.isValid && result.compact).toEqual('25596641');
  });
});
