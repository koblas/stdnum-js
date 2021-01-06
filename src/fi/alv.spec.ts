import { validate, format } from './alv';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('fi/alv', () => {
  it('format:FI 20774740', () => {
    const result = format('FI 20774740');

    expect(result).toEqual('20774740');
  });

  it('validate:FI 20774740', () => {
    const result = validate('FI 20774740');

    expect(result.isValid && result.compact).toEqual('20774740');
  });

  it('validate:123458', () => {
    const result = validate('123458');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:20774741', () => {
    const result = validate('20774741');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
