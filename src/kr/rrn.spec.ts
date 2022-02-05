import { validate, format } from './rrn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('kr/rrn', () => {
  it('format:9710139019902', () => {
    const result = format('9710139019902');

    expect(result).toEqual('971013-9019902');
  });

  it('validate:971013-9019902', () => {
    const result = validate('971013-9019902');

    expect(result.isValid && result.compact).toEqual('9710139019902');
  });

  it('validate:850529-5920042', () => {
    const result = validate('8505295920042');

    expect(result.isValid && result.compact).toEqual('8505295920042');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:971013-9019903', () => {
    const result = validate('971013-9019903');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
