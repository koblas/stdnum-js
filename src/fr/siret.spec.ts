import { validate, format } from './siret';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('fr/siret', () => {
  it('format:552 008443', () => {
    const result = format('73282932000074');

    expect(result).toEqual('732 829 320 00074');
  });

  it('validate:73282932000074', () => {
    const result = validate('73282932000074');

    expect(result.isValid && result.compact).toEqual('73282932000074');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:73282932000075', () => {
    const result = validate('73282932000075');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
