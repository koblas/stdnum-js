import { validate, format } from './stnr';
import { InvalidChecksum, InvalidLength } from '../exceptions';

describe('de/stnr', () => {
  it('format:18181508155', () => {
    const result = format('18181508155');

    expect(result).toEqual('181/815/0815 5');
  });

  it('validate:10863924976', () => {
    const result = validate('10863924976');

    expect(result.isValid && result.compact).toEqual('10863924976');
  });

  it('validate:93815/08152', () => {
    const result = validate('93815/08152');

    expect(result.isValid && result.compact).toEqual('9381508152');
  });

  it('validate:136695978', () => {
    const result = validate('136695978');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:93815/08153', () => {
    const result = validate('93815/08153');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
