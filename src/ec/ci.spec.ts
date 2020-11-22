import { validate, format } from './ci';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ec/ci', () => {
  it('format:1714307103', () => {
    const result = format('1714307103');

    expect(result).toEqual('171430710-3');
  });

  it('validate:171430710-3', () => {
    const result = validate('171430710-3');

    expect(result.isValid && result.compact).toEqual('1714307103');
  });

  it('validate:171430710', () => {
    const result = validate('171430710');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1714307104', () => {
    const result = validate('1714307104');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
