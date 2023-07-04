import { validate, format } from './moa';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('th/moa', () => {
  it('format:0993000133978', () => {
    const result = format('0993000133978');

    expect(result).toEqual('0-99-3-000-13397-8');
  });

  test.each([
    '0994000617721',
    '0-99-4-000-61772-1',
    '0 10 5 544 04660 2',
    '0 10 5 559 13643 2',
    '0 10 5 560 07360 1',
    '0 1055 43000 15 3',
    '0 12 5 551 01213 1',
    '0 19 5 554 00071 1',
    '0 22 5 550 00051 1',
    '0-10-3-541-01737-5',
    '0-10-5-518-00189-3',
    '0-10-5-539-13697-6',
    '0-10-5-554-04636-2',
    '0-7035-36000-78-2',
    '0-99-2-002-50289-9',
    '01055  6302 15 4 7',
    '0105530041751',
    '0105542067556',
    '0105543014758',
    '0105549020393',
    '0105554084159',
    '0105556000751',
    '0105556142792',
    '0115555008901',
    '0115556023301',
    '0245541000066',
    '05  0  55440 03519',
    '0655554000295',
    '0713551000259',
    '0745554003056',
    '0992001001446',
    '0992001158728',
    '0992001526719',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:0-99-4-000-61772-3', () => {
    const result = validate('0-99-4-000-61772-3');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
