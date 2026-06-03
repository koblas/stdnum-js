import { validate, format } from './cnpj';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('br/cnpj', () => {
  describe('only numbers', () => {
    it('format:16727230000197', () => {
      const result = format('16727230000197');

      expect(result).toEqual('16.727.230/0001-97');
    });

    it('validate:16.727.230/0001-97', () => {
      const result = validate('16.727.230/0001-97');

      expect(result.isValid && result.compact).toEqual('16727230000197');
    });

    it('validate:660-3', () => {
      const result = validate('660-3');

      expect(result.error).toBeInstanceOf(InvalidLength);
    });

    it('validate:16.727.230.0001-98', () => {
      const result = validate('16.727.230.0001-98');

      expect(result.error).toBeInstanceOf(InvalidChecksum);
    });

    it('validate:16.727.230/0001=9', () => {
      const result = validate('16.727.230/0001=9');

      expect(result.error).toBeInstanceOf(InvalidFormat);
    });
  });

  describe('with Alphanumeric', () => {
    it('format: 56L0HX2B000101', () => {
      const result = format('56L0HX2B000101');

      expect(result).toEqual('56.L0H.X2B/0001-01');
    });

    it('validate:56.L0H.X2B/0001-01', () => {
      const result = validate('56.L0H.X2B/0001-01');

      expect(result.isValid && result.compact).toEqual('56L0HX2B000101');
    });

    it('validate:56.L0H', () => {
      const result = validate('56.L0H');

      expect(result.error).toBeInstanceOf(InvalidLength);
    });

    it('validate:56.L0H.X2B/0001-01', () => {
      const result = validate('56.L0H.X2B/0001-02');

      expect(result.error).toBeInstanceOf(InvalidChecksum);
    });

    it('validate:56.L0H.X2B/0001=01', () => {
      const result = validate('56.L0H.X2B/0001!01');

      expect(result.error).toBeInstanceOf(InvalidFormat);
    });
  });
});
