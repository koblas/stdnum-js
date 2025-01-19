import { validate, format } from './edrpou';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ua/edrpou', () => {
  it('format:32855961', () => {
    const result = format('32855961');

    expect(result).toEqual('32855961');
  });

  test.each(['32855961', '23226362', '23246880', '25083040'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.compact).toEqual(value);
    },
  );

  it('validate:12345', () => {
    const result = validate('12345');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:32855968', () => {
    const result = validate('32855968');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
