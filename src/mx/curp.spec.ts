import { validate, getBirthDate, getGender } from './curp';

describe('mx/curp', () => {
  test.each([
    'BOXW310820HNERXN09',
    'HELO990501HVZRPN09',
    'MASI050805MVZRLRA8',
    'COME721110MVZNRR03',
    'TEAM470622HVZZPR07',
    'GARS700923HSPLXL06',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(value);
  });

  it('getBirthDate:BOXW310820HNERXN09', () => {
    const result = getBirthDate('BOXW310820HNERXN09');

    expect(result.toISOString().substr(0, 10)).toEqual('1931-08-20');
  });

  it('getGender:BOXW310820HNERXN09', () => {
    const result = getGender('BOXW310820HNERXN09');

    expect(result).toEqual('M');
  });
});
