import { validate, format } from './nie';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('uy/nie', () => {
  it('format:911211234', () => {
    const result = format('911211234');

    expect(result).toEqual('91.121.123-4');
  });

  it('validate:912345670', () => {
    const result = validate('912345670');

    expect(result.isValid && result.compact).toEqual('912345670');
  });

  it('validate:91.234.567-0', () => {
    const result = validate('91.234.567-0');

    expect(result.isValid && result.compact).toEqual('912345670');
  });

  it('validate:format:912345670', () => {
    const result = validate(format('912345670'));

    expect(result.isValid && result.compact).toEqual('912345670');
  });

  it('validate:1121123', () => {
    const result = validate('1121123');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:912345673', () => {
    const result = validate('912345673');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:91.234.567-3', () => {
    const result = validate('91.234.567-3');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
