import { validate, format } from './ytunnus';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('fi/ytunnus', () => {
  it('format:20774740', () => {
    const result = format('20774740');

    expect(result).toEqual('2077474-0');
  });

  it('validate:2077474-0', () => {
    const result = validate('2077474-0');

    expect(result.isValid && result.compact).toEqual('20774740');
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:2077474-1', () => {
    const result = validate('2077474-1');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
