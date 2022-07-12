import { validate, format } from './svnr';
import {
  InvalidLength,
  InvalidComponent,
  InvalidChecksum,
} from '../exceptions';

describe('de/svnr', () => {
  it('format:15070649C103', () => {
    const result = format('15070649C103');
    expect(result).toEqual('15 070649 C 103');
  });

  it('validate:15 070649 C 103', () => {
    const result = validate('15 070649 C 103');
    expect(result.isValid && result.compact).toEqual('15070649C103');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');
    expect(result.error).toBeInstanceOf(InvalidLength);
  });
  // // Invalid Area Code
  it('validate:01070649C103', () => {
    const result = validate('01070649C103');
    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
  // Invalid Birth month (13)
  it('validate:15071349C103', () => {
    const result = validate('15071349C103');
    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
  // Invalid Checksum
  it('validate:15070649C102', () => {
    const result = validate('15070649C102');
    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
  describe('invalid component cases', () => {
    it('validate:15JU0649C102', () => {
      const result = validate('15JU0649C102');
      expect(result.error).toBeInstanceOf(InvalidComponent);
    });
    it('validate:1507064CC102', () => {
      const result = validate('1507064CC102');
      expect(result.error).toBeInstanceOf(InvalidComponent);
    });
    it('validate:150706499102', () => {
      const result = validate('150706499102');
      expect(result.error).toBeInstanceOf(InvalidComponent);
    });
    it('validate:15070649CC03', () => {
      const result = validate('15070649CC03');
      expect(result.error).toBeInstanceOf(InvalidComponent);
    });
  });
});
