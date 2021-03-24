import { validate, format } from './peid';
import { InvalidLength } from '../exceptions';

describe('li/peid', () => {
  it('format:1234567', () => {
    const result = format('1234567');

    expect(result).toEqual('1234567');
  });

  it('validate:00001234567', () => {
    const result = validate('00001234567');

    expect(result.isValid && result.compact).toEqual('1234567');
  });

  it('validate:00001234568913454545', () => {
    const result = validate('00001234568913454545');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
