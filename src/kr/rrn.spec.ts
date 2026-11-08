import { validate, format } from './rrn';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('kr/rrn', () => {
  it('format:9710139019902', () => {
    const result = format('9710139019902');

    expect(result).toEqual('971013-9019902');
  });

  it('validate:971013-9019902', () => {
    const result = validate('971013-9019902');

    expect(result.isValid && result.compact).toEqual('9710139019902');
  });

  it('validate:850126-6401473', () => {
    const result = validate('8501266401473');

    expect(result.isValid && result.compact).toEqual('8501266401473');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:971013-9019903', () => {
    const result = validate('971013-9019903');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // Since October 2020 the last six digits are random: no place code and no
  // check digit, so only the birth date is checked for people born from 2020
  test.each(['210315-4987651', '201107-3999999', '230101-4000000'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.isIndividual).toEqual(true);
    },
  );

  it('validate:211331-4987651', () => {
    const result = validate('211331-4987651');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  // Born before 2020: the check digit is still verified
  it('validate:190315-2017653', () => {
    const result = validate('190315-2017653');

    expect(result.isValid && result.compact).toEqual('1903152017653');
  });

  it('validate:190315-2017651', () => {
    const result = validate('190315-2017651');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
