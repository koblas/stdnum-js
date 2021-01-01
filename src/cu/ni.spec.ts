import { validate, format } from './ni';
import { InvalidLength, InvalidComponent, InvalidFormat } from '../exceptions';

describe('cu/ni', () => {
  it('format:91021027775', () => {
    const result = format('91021027775');

    expect(result).toEqual('91021027775');
  });

  it('validate:91021027775', () => {
    const result = validate('91021027775');

    expect(result.isValid && result.compact).toEqual('91021027775');
  });

  it('validate:91221027775', () => {
    const result = validate('91221027775');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:9102102777A', () => {
    const result = validate('9102102777A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
