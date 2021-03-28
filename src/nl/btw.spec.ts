import { validate, format } from './btw';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('nl/btw', () => {
  it('format:004495445B01', () => {
    const result = format('004495445B01');

    expect(result).toEqual('004495445B01');
  });

  it('validate:004495445B01', () => {
    const result = validate('004495445B01');

    expect(result.isValid && result.compact).toEqual('004495445B01');
  });

  it('validate:NL4495445B01', () => {
    const result = validate('NL4495445B01');

    expect(result.isValid && result.compact).toEqual('004495445B01');
  });

  it('validate:NL002455799B11', () => {
    const result = validate('NL002455799B11');

    expect(result.isValid && result.compact).toEqual('002455799B11');
  });

  it('validate:123456789012345', () => {
    const result = validate('123456789012345');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:123456789B90', () => {
    const result = validate('123456789B90');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
