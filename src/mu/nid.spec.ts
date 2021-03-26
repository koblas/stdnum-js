import { validate, format } from './nid';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('mu/nid', () => {
  it('format:M090497290349B', () => {
    const result = format('M090497290349B');

    expect(result).toEqual('M090497290349B');
  });

  it('validate:M090497290349B', () => {
    const result = validate('M090497290349B');

    expect(result.isValid && result.compact).toEqual('M090497290349B');
  });

  it('validate:L2207971502833', () => {
    const result = validate('L2207971502833');

    expect(result.isValid && result.compact).toEqual('L2207971502833');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:M090497290348B', () => {
    const result = validate('M090497290348B');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
