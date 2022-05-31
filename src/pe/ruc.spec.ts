import { validate, format } from './ruc';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('pe/cui', () => {
  it('format:20512333797', () => {
    const result = format('20512333797');

    expect(result).toEqual('20512333797');
  });

  it('validate:20512333797', () => {
    const result = validate('20512333797');

    expect(result.isValid && result.compact).toEqual('20512333797');
  });

  it('validate:205123337', () => {
    const result = validate('205123337');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:20512333798', () => {
    const result = validate('20512333798');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:20480977239', () => {
    const result = validate('20480977239');

    expect(result.isValid && result.compact).toEqual('20480977239');
  });

  it('validate:20503644968', () => {
    const result = validate('20503644968');

    expect(result.isValid && result.compact).toEqual('20503644968');
  });

  it('validate:20515397290', () => {
    const result = validate('20515397290');

    expect(result.isValid && result.compact).toEqual('20515397290');
  });
});
