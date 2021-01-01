import { validate, format } from './vat';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ch/vat', () => {
  it('format:CHE107787577IVA', () => {
    const result = format('CHE107787577IVA');

    expect(result).toEqual('CHE-107.787.577 IVA');
  });

  it('validate:CHE-107.787.577 IVA', () => {
    const result = validate('CHE-107.787.577 IVA');

    expect(result.isValid && result.compact).toEqual('CHE107787577IVA');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:CHE-107.787.578 IVA', () => {
    const result = validate('CHE-107.787.578 IVA');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
