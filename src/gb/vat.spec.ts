import { validate, format } from './vat';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('gb/vat', () => {
  it('format:GB 980 7806 84', () => {
    const result = format('GB 980 7806 84');

    expect(result).toEqual('980 7806 84');
  });

  it('validate:ZZ100', () => {
    const result = validate('ZZ100');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:GD600', () => {
    const result = validate('GD600');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:HA100', () => {
    const result = validate('HA100');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:GD100', () => {
    const result = validate('GD100');

    expect(result.isValid && result.compact).toEqual('GD100');
  });

  it('validate:GB 980 7806 84', () => {
    const result = validate('GB 980 7806 84');

    expect(result.isValid && result.compact).toEqual('980780684');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:802311781', () => {
    const result = validate('802311781');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:GB340804329', () => {
    const result = validate('GB340804329');

    expect(result.isValid && result.compact).toEqual('340804329');
  });

  it('validate:GB346270013', () => {
    const result = validate('GB346270013');

    expect(result.isValid && result.compact).toEqual('346270013');
  });
});
