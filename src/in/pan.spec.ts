import { validate, format } from './pan';
import { InvalidLength, InvalidFormat, InvalidComponent } from '../exceptions';

describe('in/pan', () => {
  it('format:AAPPV8261K', () => {
    const result = format('AAPPV8261K');

    expect(result).toEqual('AAPPV8261K');
  });

  it('validate:ACUPA7085R', () => {
    const result = validate('ACUPA7085R');

    expect(result.isValid && result.compact).toEqual('ACUPA7085R');
  });

  it('validate:ABMPA32111', () => {
    const result = validate('ABMPA32111');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:ABMXA3211G', () => {
    const result = validate('ABMXA3211G');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:234123412347', () => {
    const result = validate('234123412347');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  // it('validate:2449/494/16/0', () => {
  //   const result = validate('2449/494/16/0');

  //   expect(result.error).toBeInstanceOf(InvalidChecksum);
  // });
});
