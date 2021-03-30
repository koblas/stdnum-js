import {
  luhnChecksumDigit,
  luhnChecksumValue,
  mod11mod10Validate,
} from './checksum';

describe('util/checksum', () => {
  describe('luhnChecksumValue', () => {
    it('basic', () => {
      expect(luhnChecksumValue('7894')).toEqual(6);
    });
  });

  describe('luhnChecksumDigit', () => {
    it('basic', () => {
      expect(luhnChecksumDigit('7894')).toEqual('9');
    });
  });

  describe('mod11mod10Validate', () => {
    it('794623', () => {
      expect(mod11mod10Validate('794623')).toBe(true);
    });
    it('794623', () => {
      expect(mod11mod10Validate('002006673085')).toBe(true);
    });
  });
});
