import { validatePassport, formatPassport, compactPassport } from './index';

describe('validatePassport', () => {
  it('should validate Brazilian passport', () => {
    const result = validatePassport('BR', 'AB123456');
    expect(result.isValid).toBe(true);
  });

  it('should validate US passport', () => {
    const result = validatePassport('US', '123456789');
    expect(result.isValid).toBe(true);
  });

  it('should validate German passport', () => {
    const result = validatePassport('DE', 'C01X00T47');
    expect(result.isValid).toBe(true);
  });

  it('should return error for unsupported country', () => {
    const result = validatePassport('XX', 'AB123456');
    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should return error for country without passport validator', () => {
    const result = validatePassport('ZZ', 'AB123456');
    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should return error for invalid format', () => {
    const result = validatePassport('BR', 'INVALID');
    expect(result.isValid).toBe(false);
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
