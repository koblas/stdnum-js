import { validate, format } from './tin';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('gn/tin', () => {
  it('format:C0000803561', () => {
    const result = format('C0000803561');

    expect(result).toEqual('C0000803561');
  });

  it('fvalidate:C0000803561', () => {
    const result = validate('C0000803561');

    expect(result.isValid && result.compact).toEqual('C0000803561');
  });

  test.each([
    'C0000803561',
    'C0002147866',
    'C001095242X',
    'C000366497X',
    'G0061140708',
    'V0003107108',
    'P0008816751',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:C000080356', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:C0000803562', () => {
    const result = validate('C0000803562');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
