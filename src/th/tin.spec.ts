import { validate, format } from './tin';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('th/tin', () => {
  it('format:1112034563562', () => {
    const result = format('1112034563562');

    expect(result).toEqual('1-1120-34563-56-2');
  });

  test.each([
    '3100600445635',
    '1-2345-45678-78-1',
    '1112034563562',
    '0 13 5 559 01262 8',
    '0 20 5 560 00584 1',
    '0 55 3 561 00041 5',
    '0 74 5 561 00276 1',
    '0-11-5-561-01623-6',
    '0-2055-61011-25-0',
    '0-2155-51001-61-8',
    '0-3035-50001-80-8',
    '0-33-3-558-00060-6',
    '0-47-5-562-00062-4',
    '0-58-3-558-00012-4',
    '0-73-5-561-00588-3',
    '0-7355-56003-30-4',
    '0105552029681',
    '0105559074461',
    '0343559002742',
    '0403552000484',
    '0835561014091',
    '1 1020 01865 33 1',
    '1 3501 00018 05 5',
    '1-40-9-900-07433-0',
    '1-4701-00062-82-7',
    '1-56-0-300-01581-3',
    '1-6707-00016-13-1',
    '1-8399-00112-47-5',
    '1129900166199',
    '1509900258294',
    '1939990003289',
    '2-30-9-900-00391-1',
    '3 2001 00052 57 9',
    '3 5099 01429 67 6',
    '3-10-1-201-21325-1',
    '3-1907-00075-74-1',
    '5-49-0-200-01960-8',
    '8 4799 88011 44 1',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:0101700230705', () => {
    const result = validate('0101700230705');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:1101700230705', () => {
    const result = validate('1101700230705');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});
