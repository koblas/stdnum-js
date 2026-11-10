import { validate, format } from './bank';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('nz/bank', () => {
  it('format:01-902-0068389-00', () => {
    const result = format('01-902-0068389-00');

    expect(result).toEqual('01-0902-0068389-000');
  });

  it('validate:01-902-0068389-00', () => {
    const result = validate('01-902-0068389-00');

    expect(result.isValid && result.compact).toEqual('0109020068389000');
  });

  // Branches from the Payments NZ bank branch register
  it('validate:0220371234560000', () => {
    const result = validate('0220371234560000');

    expect(result.isValid && result.compact).toEqual('0220371234560000');
  });

  it('validate:0420161234560000', () => {
    const result = validate('0420161234560000');

    expect(result.isValid && result.compact).toEqual('0420161234560000');
  });

  it('validate:1051651234560000', () => {
    const result = validate('1051651234560000');

    expect(result.isValid && result.compact).toEqual('1051651234560000');
  });

  it('validate:0588841234560000', () => {
    const result = validate('0588841234560000');

    expect(result.isValid && result.compact).toEqual('0588841234560000');
  });

  it('validate:123478', () => {
    const result = validate('123478');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:01-902-0068388-00', () => {
    const result = validate('01-902-0068388-00');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
