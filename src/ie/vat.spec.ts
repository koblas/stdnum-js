import { validate, format } from './vat';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ie/vat', () => {
  it('format:IE 6433435OA', () => {
    const result = format('IE 6433435OA');

    expect(result).toEqual('6433435OA');
  });

  it('validate:IE 6433435F', () => {
    const result = validate('IE 6433435F');

    expect(result.isValid && result.compact).toEqual('6433435F');
  });

  it('validate:IE 6433435OA', () => {
    const result = validate('IE 6433435OA');

    expect(result.isValid && result.compact).toEqual('6433435OA');
  });

  it('validate:8D79739I', () => {
    const result = validate('8D79739I');

    expect(result.isValid && result.compact).toEqual('8D79739I');
  });

  it('validate:1234567890', () => {
    const result = validate('1234567890');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:6433435E', () => {
    const result = validate('6433435E');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
