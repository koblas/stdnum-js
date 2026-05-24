import { validate, format, compact } from './nif';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('ao/nif', () => {
  it('format:0000000001', () => {
    const result = format('0000000001');

    expect(result).toEqual('0000000001');
  });

  it('compact:0000000001', () => {
    const result = compact('0000000001');

    expect(result).toEqual('0000000001');
  });

  it('validate:5001191020 (company)', () => {
    const result = validate('5001191020');

    if (!result.isValid) throw new Error('Expected valid');
    expect(result.compact).toEqual('5001191020');
    expect(result.isCompany).toEqual(true);
    expect(result.isIndividual).toEqual(false);
  });

  it('validate:003534962LA033 (individual)', () => {
    const result = validate('003534962LA033');

    if (!result.isValid) throw new Error('Expected valid');
    expect(result.compact).toEqual('003534962LA033');
    expect(result.isCompany).toEqual(false);
    expect(result.isIndividual).toEqual(true);
  });

  it('validate:123456789 (invalid length)', () => {
    const result = validate('123456789');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345678901 (invalid length)', () => {
    const result = validate('12345678901');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:123456789A (invalid format)', () => {
    const result = validate('123456789A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
