import { validate, format } from './idnr';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('th/idnr', () => {
  it('format:1112034563562', () => {
    const result = format('1112034563562');

    expect(result).toEqual('1-1120-34563-56-2');
  });

  it('validate:1112034563562', () => {
    const result = validate('1112034563562');

    expect(result.isValid && result.compact).toEqual('1112034563562');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1101700230705', () => {
    const result = validate('1101700230705');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
