import { validate, format } from './vkn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('tr/vkn', () => {
  it('format:4540536920', () => {
    const result = format('4540536920');

    expect(result).toEqual('4540536920');
  });

  it('validate:4540536920', () => {
    const result = validate('4540536920');

    expect(result.isValid && result.compact).toEqual('4540536920');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:4540536921', () => {
    const result = validate('4540536921');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
