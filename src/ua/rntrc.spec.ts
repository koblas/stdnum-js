import { validate, format } from './rntrc';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ua/rntrc', () => {
  it('format:1759013776', () => {
    const result = format('1759013776');

    expect(result).toEqual('1759013776');
  });

  it('validate:1759013776', () => {
    const result = validate('1759013776');

    expect(result.isValid && result.compact).toEqual('1759013776');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1759013770', () => {
    const result = validate('1759013770');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
