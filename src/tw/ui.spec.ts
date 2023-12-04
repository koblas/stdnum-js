import { validate, format } from './ui';
import {
  InvalidLength,
  InvalidComponent,
  InvalidChecksum,
} from '../exceptions';

describe('tw/ui', () => {
  it('format:00501-50 3', () => {
    const result = format('00501-50 3');

    expect(result).toEqual('00501503');
  });

  it('validate:AB00501503', () => {
    const result = validate('AB00501503');

    expect(result.isValid && result.compact).toEqual('AB00501503');
  });

  it('validate:AD00501509', () => {
    const result = validate('AD00501509');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:12345', () => {
    const result = validate('12345');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:A700501503', () => {
    const result = validate('A700501503');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  // additional tests
  test.each(['A200501503', 'A800501509', 'CC00151113'])('not-valid:', value => {
    const result = validate(value);
    expect(result.isValid).toEqual(false);
  });

  test.each(['AB12345677', 'CC00151114', 'AB00501503'])('valid:', value => {
    const result = validate(value);
    expect(result.isValid).toEqual(true);
  });
});
