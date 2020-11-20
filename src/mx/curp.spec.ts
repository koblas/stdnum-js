import { validate, getBirthDate, getGender } from './curp';

describe('mx/curp', () => {
  it('validate:BOXW310820HNERXN09', () => {
    const result = validate('BOXW310820HNERXN09');

    expect(result.isValid && result.compact).toEqual('BOXW310820HNERXN09');
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
