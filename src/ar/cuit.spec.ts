import { validate, format } from './cuit';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ar/cuit', () => {
  it('format:20-05536168-2', () => {
    const result = format('20-05536168-2');

    expect(result).toEqual('20-05536168-2');
  });

  it('validate:20-05536168-2', () => {
    const result = validate('20-05536168-2');

    expect(result.isValid && result.compact).toEqual('20055361682');
  });

  it('validate:2026756539', () => {
    const result = validate('2026756539');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:20267565392', () => {
    const result = validate('20267565392');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
