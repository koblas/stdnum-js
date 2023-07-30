import { validate, format } from './gst';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ca/gst', () => {
  it('format:754039725 RT 0001', () => {
    const result = format('754039725 RT 0001');

    expect(result).toEqual('754039725RT0001');
  });

  it('fvalidate:754039725 RT 0001', () => {
    const result = validate('754039725 RT 0001');

    expect(result.isValid && result.compact).toEqual('754039725RT0001');
  });

  test.each(['807138417RT0001', '754039725 RT 0001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:VALUE', () => {
    const result = validate('VALUE');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:754039729 RT 0001', () => {
    const result = validate('754039729 RT 0001');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
