import { validate, format } from './tn';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('eg/tn', () => {
  it('format:100531385', () => {
    const result = format('100531385');

    expect(result).toEqual('100-531-385');
  });

  it('fvalidate:100-531-385', () => {
    const result = validate('100-531-385');

    expect(result.isValid && result.compact).toEqual('100531385');
  });

  test.each([
    '100-531-385',
    '٣٣١-١٠٥-٢٦٨',
    '421 – 159 – 723',
    '431-134-189',
    '432-600-132',
    '455-466-138',
    '455273677',
    '٩٤٦-١٤٩-٢٠٠',
    '۹٤۹-۸۹۱-۲۰٤',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:VV3456789', () => {
    const result = validate('VV3456789');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:12345', () => {
    const result = validate('12345');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});
