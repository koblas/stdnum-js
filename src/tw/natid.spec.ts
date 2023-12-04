import { validate, format } from './natid';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('tw/natid', () => {
  it('format:0050150 3', () => {
    const result = format('005-0150 3');

    expect(result).toEqual('00501503');
  });

  it('validate:A200501505', () => {
    const result = validate('A200501505');

    expect(result.isValid && result.compact).toEqual('A200501505');
  });

  it('validate:12345', () => {
    const result = validate('12345');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345AAAA', () => {
    const result = validate('12345AAA1A');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  test.each(['A200501503', 'A800501509', 'A800501509'])('not-valid:', value => {
    const result = validate(value);
    expect(result.isValid).toEqual(false);
  });

  test.each(['A800000014', 'A123456789', 'A100501503', 'A200501505'])(
    'valid:',
    value => {
      const result = validate(value);
      expect(result.isValid).toEqual(true);
    },
  );
});
