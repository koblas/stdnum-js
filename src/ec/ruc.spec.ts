import { validate, format } from './ruc';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ec/ruc', () => {
  it('format:1792060346001', () => {
    const result = format('1792060346001');

    expect(result).toEqual('1792060346-001');
  });

  it('validate:1792060346-001', () => {
    const result = validate('1792060346-001');

    expect(result.isValid && result.compact).toEqual('1792060346001');
  });

  test.each(['0101016905001', '0962467429001', '1803557964001'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toEqual(true);
    },
  );

  it('validate:1792060346-00', () => {
    const result = validate('1792060346-00');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1792060347-001', () => {
    const result = validate('1792060347-001');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // Third digit 9 can also be a public RUC (python-stdnum tries public first)
  it('validate:1792021746001', () => {
    const result = validate('1792021746001');

    expect(result.isValid && result.compact).toEqual('1792021746001');
  });
});
