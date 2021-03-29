import { validate, format } from './regon';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('pl/regon', () => {
  it('format:123456785', () => {
    const result = format('123456785');

    expect(result).toEqual('123456785');
  });

  it('validate:192598184', () => {
    const result = validate('192598184');

    expect(result.isValid && result.compact).toEqual('192598184');
  });

  it('validate:123456785', () => {
    const result = validate('123456785');

    expect(result.isValid && result.compact).toEqual('123456785');
  });

  it('validate:12345678512347', () => {
    const result = validate('12345678512347');

    expect(result.isValid && result.compact).toEqual('12345678512347');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:192598183', () => {
    const result = validate('192598183');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:12345678612342', () => {
    const result = validate('12345678612342');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:12345678512348', () => {
    const result = validate('12345678512348');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
