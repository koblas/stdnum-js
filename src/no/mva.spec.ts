import { validate, format } from './mva';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('no/mva', () => {
  it('format:NO995525828MVA', () => {
    const result = format('NO995525828MVA');

    expect(result).toEqual('NO 995 525 828 MVA');
  });

  it('validate:NO 995 525 828 MVA', () => {
    const result = validate('NO 995 525 828 MVA');

    expect(result.isValid && result.compact).toEqual('995525828MVA');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:NO 995 525 829 MVA', () => {
    const result = validate('NO 995 525 829 MVA');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
