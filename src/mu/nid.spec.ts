import { validate, format } from './nid';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

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

  // Day 32, with a valid check character
  it('validate:M3204972903495', () => {
    const result = validate('M3204972903495');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  // Month 13, with a valid check character
  it('validate:M091397290349A', () => {
    const result = validate('M091397290349A');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:M090497290348B', () => {
    const result = validate('M090497290348B');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // Check character 0 (weighted sum % 17 === 0)
  test.each(['L0207971502210', 'L2201971306870'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:L020797150221H', () => {
    const result = validate('L020797150221H');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
