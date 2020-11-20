import { isValidDate } from './isValidDate';

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
});
