import { validate, format } from './siren';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('fr/siren', () => {
  it('format:552 008 443', () => {
    const result = format('552008443');

    expect(result).toEqual('552 008 443');
  });

  it('validate:552 008 443', () => {
    const result = validate('552 008 443');

    expect(result.isValid && result.compact).toEqual('552008443');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:552 008 442', () => {
    const result = validate('552 008 442');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
