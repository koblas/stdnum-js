import { validate, format } from './ci';
import { InvalidLength, InvalidFormat, InvalidComponent } from '../exceptions';

describe('bo/ci', () => {
  // Format tests
  it('format:1234567SC', () => {
    const result = format('1234567SC');

    expect(result).toEqual('1234567-SC');
  });

  it('format:12345678LP', () => {
    const result = format('12345678LP');

    expect(result).toEqual('12345678-LP');
  });

  it('format:1234567SC1', () => {
    const result = format('1234567SC1');

    expect(result).toEqual('1234567-SC-1');
  });

  it('format:1234567-OR-AB', () => {
    const result = format('1234567-OR-AB');

    expect(result).toEqual('1234567-OR-AB');
  });

  it('format: 9876543.PT.2', () => {
    const result = format('9876543.PT.2');

    expect(result).toEqual('9876543-PT-2');
  });

  // Valid cases
  it('validate:1234567-SC', () => {
    const result = validate('1234567-SC');

    expect(result.isValid && result.compact).toEqual('1234567SC');
  });

  it('validate:12345678-LP', () => {
    const result = validate('12345678-LP');

    expect(result.isValid && result.compact).toEqual('12345678LP');
  });

  it('validate:1234567-OR-1', () => {
    const result = validate('1234567-OR-1');

    expect(result.isValid && result.compact).toEqual('1234567OR1');
  });

  it('validate:9876543.CB.AB', () => {
    const result = validate('9876543.CB.AB');

    expect(result.isValid && result.compact).toEqual('9876543CBAB');
  });

  it('validate:5555555-PT', () => {
    const result = validate('5555555-PT');

    expect(result.isValid && result.compact).toEqual('5555555PT');
  });

  it('validate:12345678-CH-A', () => {
    const result = validate('12345678-CH-A');

    expect(result.isValid && result.compact).toEqual('12345678CHA');
  });

  it('validate:7654321-TJ-99', () => {
    const result = validate('7654321-TJ-99');

    expect(result.isValid && result.compact).toEqual('7654321TJ99');
  });

  it('validate:8888888-BE', () => {
    const result = validate('8888888-BE');

    expect(result.isValid && result.compact).toEqual('8888888BE');
  });

  it('validate:11111111-PD-B', () => {
    const result = validate('11111111-PD-B');

    expect(result.isValid && result.compact).toEqual('11111111PDB');
  });

  // Invalid length - too short
  it('validate:123-SC', () => {
    const result = validate('123-SC');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:123456-LP', () => {
    const result = validate('123456-LP');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  // Invalid length - too long
  it('validate:123456789-OR', () => {
    const result = validate('123456789-OR');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  // Invalid format - extension too long (3 characters)
  it('validate:1234567-SC-ABC', () => {
    const result = validate('1234567-SC-ABC');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  // Invalid format - special characters
  it('validate:1234567=SC', () => {
    const result = validate('1234567=SC');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  // Invalid format - letters instead of numbers
  it('validate:ABCDEFG-SC', () => {
    const result = validate('ABCDEFG-SC');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  // Invalid format - special characters in extension
  it('validate:1234567-SC-@#', () => {
    const result = validate('1234567-SC-@#');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  // Invalid length - department code with numbers (total length check)
  it('validate:9999999-12', () => {
    const result = validate('9999999-12');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  // Invalid length - department code mixed (total length check)
  it('validate:1234567-1C', () => {
    const result = validate('1234567-1C');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  // Invalid department code
  it('validate:1234567-XX', () => {
    const result = validate('1234567-XX');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:1234567-BR', () => {
    const result = validate('1234567-BR');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:12345678-ZZ', () => {
    const result = validate('12345678-ZZ');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:1234567-AA-1', () => {
    const result = validate('1234567-AA-1');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:9876543-QQ', () => {
    const result = validate('9876543-QQ');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});
