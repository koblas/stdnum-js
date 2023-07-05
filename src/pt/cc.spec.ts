import { validate, format } from './cc';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('pt/cc', () => {
  it('format:000000000ZZ4', () => {
    const result = format('000000000ZZ4');

    expect(result).toEqual('00000000 0 ZZ4');
  });

  it('validate:10000000 0 ZZ2', () => {
    const result = validate('10000000 0 ZZ2');

    expect(result.isValid && result.compact).toEqual('100000000ZZ2');
  });

  test.each(['04521224 4 ZZ 7', '054546796ZY7', '101490801ZY0'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toEqual(true);
    },
  );

  it('validate:00000000 0 ZZ', () => {
    const result = validate('00000000 0 ZZ');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:00000000 A ZZ4', () => {
    const result = validate('00000000 A ZZ4');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:10000000 0 ZZ4', () => {
    const result = validate('10000000 0 ZZ4');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
