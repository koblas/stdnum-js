import { validate, format } from './nik';
import { InvalidLength, InvalidFormat, InvalidComponent } from '../exceptions';

describe('id/nik', () => {
  it('format:3273 0157 0890 0001', () => {
    const result = format('3273 0157 0890 0001');

    expect(result).toEqual('3273015708900001');
  });

  it('validate:3273.01.570890.0001', () => {
    const result = validate('3273.01.570890.0001');

    expect(result.isValid && result.compact).toEqual('3273015708900001');
    expect(result.isValid && result.isIndividual).toEqual(true);
  });

  it('validate:3171011708450001', () => {
    const result = validate('3171011708450001');

    expect(result.isValid && result.compact).toEqual('3171011708450001');
  });

  it('validate:6501014101000001 (North Kalimantan, 2000-01-01)', () => {
    const result = validate('6501014101000001');

    expect(result.isValid && result.compact).toEqual('6501014101000001');
  });

  it('validate:9601012902000001 (Southwest Papua, 2000-02-29)', () => {
    const result = validate('9601012902000001');

    expect(result.isValid && result.compact).toEqual('9601012902000001');
  });

  it('validate:31710117084500', () => {
    const result = validate('31710117084500');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:317101170845000A', () => {
    const result = validate('317101170845000A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:9971011708450001', () => {
    const result = validate('9971011708450001');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:3171013002001234', () => {
    const result = validate('3171013002001234');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:3171013213901234', () => {
    const result = validate('3171013213901234');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});
