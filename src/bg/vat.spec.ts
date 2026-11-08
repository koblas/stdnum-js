import { validate, format } from './vat';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('bg/vat', () => {
  it('format:BG 175 074 752', () => {
    const result = format('BG 175 074 752');

    expect(result).toEqual('175074752');
  });

  it('validate:BG 175 074 752', () => {
    const result = validate('BG 175 074 752');

    expect(result.isValid && result.compact).toEqual('175074752');
  });

  it('validate:175 074 752', () => {
    const result = validate('175 074 752');

    expect(result.isValid && result.compact).toEqual('175074752');
  });

  it('validate:BG 175 074 75', () => {
    const result = validate('BG 175 074 75');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:BG 175 074 754', () => {
    const result = validate('BG 175 074 754');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // A registered VAT number starting with 8. The first digit is not
  // restricted: python-stdnum's bg/vat has no such rule.
  it('validate:BG 831642181', () => {
    const result = validate('BG 831642181');

    expect(result.isValid && result.compact).toEqual('831642181');
  });

  it('validate:BG 831642182', () => {
    const result = validate('BG 831642182');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
