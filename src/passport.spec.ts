import { validatePassport, formatPassport, compactPassport } from './index';

describe('validatePassport', () => {
  it('should validate Brazilian passport', () => {
    const result = validatePassport('BR', 'AB123456');
    expect(result).toMatchObject({ checked: true, isValid: true });
  });

  it('should validate US passport', () => {
    const result = validatePassport('US', '123456789');
    expect(result).toMatchObject({ checked: true, isValid: true });
  });

  it('should validate German passport', () => {
    const result = validatePassport('DE', 'C01X00T47');
    expect(result).toMatchObject({ checked: true, isValid: true });
  });

  it('should accept lowercase country code', () => {
    const result = validatePassport('br', 'AB123456');
    expect(result).toMatchObject({ checked: true, isValid: true });
  });

  it('should not check unsupported country', () => {
    const result = validatePassport('XX', 'AB123456');
    expect(result).toEqual({ checked: false });
  });

  it('should not check country without passport validator', () => {
    const result = validatePassport('ZZ', 'AB123456');
    expect(result).toEqual({ checked: false });
  });

  it('should return error for invalid format', () => {
    const result = validatePassport('BR', 'INVALID');
    expect(result).toMatchObject({ checked: true, isValid: false });
    expect(result.checked && result.error).toBeDefined();
  });
});

describe('formatPassport', () => {
  it('should format Brazilian passport', () => {
    const result = formatPassport('BR', 'AB123456');
    expect(result).toBe('AB123456');
  });

  it('should return unchanged value for unsupported country', () => {
    const result = formatPassport('XX', 'AB123456');
    expect(result).toBe('AB123456');
  });
});

describe('compactPassport', () => {
  it('should compact Brazilian passport', () => {
    const result = compactPassport('BR', 'AB123456');
    expect(result).toBe('AB123456');
  });

  it('should return unchanged value for unsupported country', () => {
    const result = compactPassport('XX', 'AB123456');
    expect(result).toBe('AB123456');
  });
});
