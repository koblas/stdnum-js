import { validate, format } from './unp';
import { InvalidLength, InvalidChecksum } from '../exceptions';

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

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:200988542', () => {
    const result = validate('200988542');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
