import { validate, format } from './unp';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
  InvalidFormat,
} from '../exceptions';

describe('by/unp', () => {
  it('format:200988541', () => {
    const result = format('200988541');

    expect(result).toEqual('200988541');
  });

  it('validate:200988541', () => {
    const result = validate('200988541');

    expect(result.isValid && result.compact).toEqual('200988541');
  });

  it('validate:УНП MA1953684', () => {
    const result = validate('УНП MA1953684');

    expect(result.isValid && result.compact).toEqual('MA1953684');
  });

  // First digit 9 is not used (valid check digit)
  it('validate:912345675', () => {
    const result = validate('912345675');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  // First digit 8 is not used (valid check digit)
  it('validate:812345679', () => {
    const result = validate('812345679');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  // A digit and a letter mixed in the first 2 characters (valid check digit)
  it('validate:7A1234563', () => {
    const result = validate('7A1234563');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:200988542', () => {
    const result = validate('200988542');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
