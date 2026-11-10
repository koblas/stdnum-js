import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('py/passport', () => {
  it('format:AB123456', () => {
    const result = format('AB123456');

    expect(result).toEqual('AB123456');
  });

  test.each(['AB123456', 'PY000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB12#456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['A1'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('py/passport other formats', () => {
  test.each(['1234567', '001234567', 'D12345', 'Q123456'])(
    'validate:%s',
    value => {
      expect(validate(value).isValid).toBeTruthy();
    },
  );
});
