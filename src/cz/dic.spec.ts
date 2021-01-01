import { validate, format } from './dic';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('cz/dic', () => {
  it('format:CZ 25123891', () => {
    const result = format('CZ 25123891');

    expect(result).toEqual('25123891');
  });

  it('validate:CZ 25123891', () => {
    const result = validate('CZ 25123891');

    expect(result.isValid && result.compact).toEqual('25123891');
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:25123890', () => {
    const result = validate('25123890');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
