import { validate, format } from './npwp';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('id/npwp', () => {
  it('format:013000666091000', () => {
    const result = format('013000666091000');

    expect(result).toEqual('01.300.066.6-091.000');
  });

  it('validate:01.312.166.0-091.000', () => {
    const result = validate('01.312.166.0-091.000');

    expect(result.isValid && result.compact).toEqual('013121660091000');
  });

  it('validate:016090524017000', () => {
    const result = validate('016090524017000');

    expect(result.isValid && result.compact).toEqual('016090524017000');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:216090524017001', () => {
    const result = validate('216090524017001');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
