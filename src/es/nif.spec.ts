import { validate, format } from './nif';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('es/nif', () => {
  it('format:ES B58378431', () => {
    const result = format('ES B58378431');

    expect(result).toEqual('B-58378431');
  });

  it('validate:ES B-58378431', () => {
    const result = validate('ES B-58378431');

    expect(result.isValid && result.compact).toEqual('B58378431');
  });

  it('validate:B64717838', () => {
    const result = validate('B64717838');

    expect(result.isValid && result.compact).toEqual('B64717838');
  });

  it('validate:54362315K', () => {
    const result = validate('54362315K');

    expect(result.isValid && result.compact).toEqual('54362315K');
  });

  it('validate:X-5253868-R', () => {
    const result = validate('X-5253868-R');

    expect(result.isValid && result.compact).toEqual('X5253868R');
  });

  it('validate:M-1234567-L', () => {
    const result = validate('M-1234567-L');

    expect(result.isValid && result.compact).toEqual('M1234567L');
  });

  it('validate:B647178390', () => {
    const result = validate('54362315');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:B64717839', () => {
    const result = validate('B64717839');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
