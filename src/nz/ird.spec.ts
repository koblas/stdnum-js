import { validate, format } from './ird';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('nz/ird', () => {
  it('format:4909185-0', () => {
    const result = format('4909185-0');

    expect(result).toEqual('49-091-850');
  });

  it('format:049091850', () => {
    const result = format('049091850');

    expect(result).toEqual('049-091-850');
  });

  it('format:150000009', () => {
    const result = format('150000009');

    expect(result).toEqual('150-000-009');
  });

  it('validate:4909185-0', () => {
    const result = validate('4909185-0');

    expect(result.isValid && result.compact).toEqual('49091850');
  });

  it('validate:NZ 4909185-0', () => {
    const result = validate('NZ 4909185-0');

    expect(result.isValid && result.compact).toEqual('49091850');
  });

  // Valid check digit, but below the issued range
  it('validate:03896099', () => {
    const result = validate('03896099');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  // Valid since Inland Revenue raised the upper limit to 200,000,000 (2026)
  it('validate:150000009', () => {
    const result = validate('150000009');

    expect(result.isValid && result.compact).toEqual('150000009');
  });

  it('validate:199-999-990', () => {
    const result = validate('199-999-990');

    expect(result.isValid && result.compact).toEqual('199999990');
  });

  // Valid check digit, but above the upper limit
  it('validate:200000005', () => {
    const result = validate('200000005');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:123478', () => {
    const result = validate('123478');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:136410133', () => {
    const result = validate('136410133');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
