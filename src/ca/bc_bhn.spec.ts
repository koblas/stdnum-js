import { validate, format } from './bc_bhn';
import {
  InvalidChecksum,
  InvalidComponent,
  InvalidFormat,
} from '../exceptions';

describe('ca/bc_bhn', () => {
  it('format:9698658215', () => {
    const result = format('9698658215');

    expect(result).toEqual('9698 658 215');
  });

  test.each(['9698 658 215'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:9736A04212', () => {
    const result = validate('9736A04212');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:5736504210', () => {
    const result = validate('5736504210');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:9698648215', () => {
    const result = validate('9698648215');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});
