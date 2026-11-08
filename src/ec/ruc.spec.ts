import { validate, format } from './ruc';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

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

  // Company RUCs have no published check digit, so numbers that fail the
  // historical mod-11 scheme are still valid.
  test.each(['1792060347001', '0993381661001', '1760001550001'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toEqual(true);
    },
  );

  it('validate:0926687851-001', () => {
    // Natural-person RUC with an invalid cedula check digit
    const result = validate('0926687851-001');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  test.each(['0993381661000', '1760001550000', '2593381661001'])(
    'validate-invalid-component:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidComponent);
    },
  );

  // Third digit 9 RUC that passes the public RUC mod-11 scheme
  it('validate:1792021746001', () => {
    const result = validate('1792021746001');

    expect(result.isValid && result.compact).toEqual('1792021746001');
  });
});
