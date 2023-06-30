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

  it('validate:A800501509', () => {
    const result = validate('A800501509');

    expect(result.isValid && result.compact).toEqual('A800501509');
  });

  it('validate:A800501508', () => {
    const result = validate('A800501508');

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
});
