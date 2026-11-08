import { validate, format } from './vat';
import {
  InvalidLength,
  InvalidFormat,
  InvalidComponent,
  InvalidChecksum,
} from '../exceptions';

describe('bh/vat', () => {
  it('format:200000425500002', () => {
    const result = format('2000 0042 5500 002');

    expect(result).toEqual('200000425500002');
  });

  // Numbers published by companies on their VAT registration certificates
  test.each([
    '200000425500002', // Arab Banking Corporation (Bank ABC)
    '200000415600002', // Bank of Bahrain and Kuwait
    '200000190500002', // stc Bahrain
    '210000463600002', // Kuwait Finance House VAT group (21: group account)
    '220000129500002', // Bahrain Bourse (22 series: no Luhn check)
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(value);
  });

  // Position 10 is a Luhn check digit for numbers starting with 20
  test.each(['200000425600002', '200000415500002'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:100000425500002', () => {
    const result = validate('100000425500002');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  test.each(['20000042550000', '2000004255000021'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:20000042550000A', () => {
    const result = validate('20000042550000A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
