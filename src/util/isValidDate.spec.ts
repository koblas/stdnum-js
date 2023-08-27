import { isValidDate, validBirthdate } from './isValidDate';

describe('isValidDate', () => {
  it('2020-01-02', () => {
    expect(isValidDate('2020', '01', '02')).toEqual(true);
  });

  it('2020-01-40', () => {
    expect(isValidDate('2020', '01', '40')).toEqual(false);
  });

  it('19-02-29', () => {
    expect(isValidDate('19', '02', '29')).toEqual(false);
  });

  it('20-02-29', () => {
    expect(isValidDate('20', '02', '29')).toEqual(true);
  });

  describe('birthdates', () => {
    describe('validBirthdate', () => {
      it('today', () => {
        const now = new Date();
        // remove those pesky minutes...
        const date = new Date(now.toISOString().substring(0, 10));
        expect(validBirthdate(date)).toEqual(true);
      });

      it('tomorrow', () => {
        const now = new Date();
        now.setDate(now.getDate() + 1);
        const date = new Date(now.toISOString().substring(0, 10));
        expect(validBirthdate(date)).toEqual(false);
      });

      it('2010-01-01', () => {
        expect(validBirthdate(new Date('2010-01-01'))).toEqual(true);
      });

      it('2030-01-01', () => {
        expect(validBirthdate(new Date('2030-01-01'))).toEqual(false);
      });
    });

    it('2090-02-29', () => {
      expect(isValidDate('2090', '02', '29', true)).toEqual(false);
    });
  });
});
