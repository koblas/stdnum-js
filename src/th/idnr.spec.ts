import { validate, format } from './idnr';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('th/idnr', () => {
  it('format:1112034563562', () => {
    const result = format('1112034563562');

    expect(result).toEqual('1-1120-34563-56-2');
  });

  test.each(['3100600445635', '1-2345-45678-78-1', '1112034563562'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toEqual(true);
    },
  );

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:0101700230705', () => {
    const result = validate('0101700230705');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:1101700230705', () => {
    const result = validate('1101700230705');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
