import { validate, format } from './cedula';
import { InvalidComponent, InvalidLength } from '../exceptions';

describe('py/ci', () => {
  it('format:6.001.234', () => {
    const result = format('6.001.234');

    expect(result).toEqual('6001234');
  });

  it('validate:15000', () => {
    const result = validate('15000');

    expect(result.isValid && result.compact).toEqual('15000');
  });

  it('validate:3 785 123', () => {
    const result = validate('3 785 123');

    expect(result.isValid && result.compact).toEqual('3785123');
  });

  it('validate:6-001-234', () => {
    const result = validate('6-001-234');

    expect(result.isValid && result.compact).toEqual('6001234');
  });

  it('validate:660.3', () => {
    const result = validate('660.3');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:26601234', () => {
    const result = validate('26601234');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:266012A', () => {
    const result = validate('266012A');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});
