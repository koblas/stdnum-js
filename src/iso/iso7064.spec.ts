import { iso7064mod10x11validate } from './iso7064';

describe('iso7064', () => {
  describe('iso7064mod10x11validate', () => {
    it('794623', () => {
      expect(iso7064mod10x11validate('794623')).toEqual(true);
    });

    it('002006673085', () => {
      expect(iso7064mod10x11validate('002006673085')).toEqual(true);
    });

    it('00200667308', () => {
      expect(iso7064mod10x11validate('00200667308')).toEqual(false);
    });
  });
});
