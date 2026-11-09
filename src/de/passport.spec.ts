import { validate, format } from './passport';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('de/passport', () => {
  it('format:C01X00T47', () => {
    const result = format('C01X00T47');

    expect(result).toEqual('C01X00T47');
  });

  test.each(['C01X00T47', 'C01X00T478', 'CZ6311T472D'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toBeTruthy();
    },
  );

  test.each(['C01X00T47999', 'C01X0'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:C01X00T479', () => {
    const result = validate('C01X00T479');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

describe('de/passport other formats', () => {
  test.each(['A1234567', 'B1234567'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });

  test.each(['C01X00T4', 'XC01X00T47', 'D1234567'])('validate:%s', value => {
    expect(validate(value).error).toBeInstanceOf(InvalidFormat);
  });
});
