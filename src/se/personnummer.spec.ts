import { validate, format } from './personnummer';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('se/personnummer', () => {
  it('format:8803200016', () => {
    const result = format('8803200016');

    expect(result).toEqual('880320-0016');
  });

  it('validate:880320-0016', () => {
    const result = validate('880320-0016');

    expect(result.isValid && result.compact).toEqual('880320-0016');
  });

  test.each(['811228-9874', '670919-9530', '11900102-2384'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toEqual(true);
    },
  );

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:880320-0018', () => {
    const result = validate('880320-0018');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
