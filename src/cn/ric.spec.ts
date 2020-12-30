import { validate, format } from './ric';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('cn/ric', () => {
  it('format:360426199101010071', () => {
    const result = format('360426199101010071');

    expect(result).toEqual('360426199101010071');
  });

  it('validate:360426199101010071', () => {
    const result = validate('360426199101010071');

    expect(result.isValid && result.compact).toEqual('360426199101010071');
  });

  it('validate:120103198806018241', () => {
    const result = validate('120103198806018241');

    expect(result.isValid && result.compact).toEqual('120103198806018241');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:360426199101010072', () => {
    const result = validate('360426199101010072');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
