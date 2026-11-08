import { validate, format } from './ruc';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('py/ruc', () => {
  it('format:800280610', () => {
    const result = format('80028061 0');

    expect(result).toEqual('80028061-0');
  });

  it('validate:80028061-0', () => {
    const result = validate('80028061-0');

    expect(result.isValid && result.compact).toEqual('800280610');
  });

  it('validate:8765432-6', () => {
    const result = validate('8765432-6');

    expect(result.isValid && result.compact).toEqual('87654326');
  });

  it('validate:2660-3', () => {
    const result = validate('2660-3');

    expect(result.isValid && result.compact).toEqual('26603');
  });

  it('validate:660-3', () => {
    const result = validate('660-3');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:2660-4', () => {
    const result = validate('2660-4');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // Check digit 0 (sum % 11 === 0)
  test.each(['1280950-0', '2195990-0'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:1280950-1', () => {
    const result = validate('1280950-1');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
