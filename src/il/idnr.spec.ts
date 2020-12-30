import { validate, format } from './idnr';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('il/idnr', () => {
  it('format:39337423', () => {
    const result = format('39337423');

    expect(result).toEqual('3933742-3');
  });

  it('validate:3933742-3', () => {
    const result = validate('3933742-3');

    expect(result.isValid && result.compact).toEqual('39337423');
  });

  it('validate:3933742999', () => {
    const result = validate('3933742999');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:3933742-2', () => {
    const result = validate('3933742-2');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
