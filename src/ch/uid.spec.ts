import { validate, format } from './uid';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ch/uid', () => {
  it('format:CHE100155212', () => {
    const result = format('CHE100155212');

    expect(result).toEqual('CHE-100.155.212');
  });

  it('validate:CHE109910570', () => {
    const result = validate('CHE109910570');

    expect(result.isValid && result.compact).toEqual('CHE109910570');
  });

  it('validate:CHE-100.155.212', () => {
    const result = validate('CHE-100.155.212');

    expect(result.isValid && result.compact).toEqual('CHE100155212');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:CHE-100.155.212', () => {
    const result = validate('CHE-100.155.211');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
