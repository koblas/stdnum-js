import { validate, compact, format } from './nrt';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('ad/nrt', () => {
  it('validate("U-132950-X")', () => {
    const result = validate('U-132950-X');

    expect(result.isValid && result.compact).toEqual('U132950X');
  });

  it('validate A123B', () => {
    const result = validate('A123B');
    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate("I 706193 G")', () => {
    const result = validate('I 706193 G');
    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('format("D059888N")', () => {
    expect(format('D059888N')).toEqual('D-059888-N');
  });

  it('validate("U-132950-X")', () => {
    expect(() => validate('U-132950-X')).not.toThrow();
  });

  it('isValid("U-132950-X")', () => {
    // expect(isValid("U-132950-X")).toBeTruthy();
  });

  it('compact("U-132950-X")', () => {
    expect(compact('U-132950-X')).toEqual('U132950X');
  });
});
