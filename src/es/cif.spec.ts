import { validate, format } from './cif';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('es/cif', () => {
  it('format:J99216582', () => {
    const result = format('J99216582');

    expect(result).toEqual('J-9921658-2');
  });

  it.each(['J99216582', 'B86670460', 'Q2876031B', 'N0112768G', 'W8265365J'])(
      'validate:%s',
      (cif: string) => {
        const result = validate(cif);

        expect(result.isValid && result.compact).toEqual(cif);
      },
  );

  it('validate:X13585626', () => {
    const result = validate('X13585626');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:J992165831', () => {
    const result = validate('J992165831');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:M-1234567-L', () => {
    const result = validate('M-1234567-L');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:O-1234567-L', () => {
    const result = validate('O-1234567-L');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});
