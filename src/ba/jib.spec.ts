import { validate, format } from './jib';
import {
  InvalidLength,
  InvalidFormat,
  InvalidComponent,
  InvalidChecksum,
} from '../exceptions';

describe('ba/jib', () => {
  it('format:4200211100005', () => {
    const result = format('42002 1110 0005');

    expect(result).toEqual('4200211100005');
  });

  // Numbers published by public companies and public bodies
  test.each([
    '4200211100005', // BH Telecom d.d. Sarajevo (FBiH)
    '4200211100951', // BH Telecom branch (positions 10-12 not 000)
    '4400958880009', // UniCredit Bank a.d. Banja Luka (RS)
    '4402889700004', // IDDEEA
    '4401711930000', // Indirect Taxation Authority (UIO)
    '4600047650005', // Brčko District company
    '4404460110007', // 9th digit doesn't follow the usual rule; not checked
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(value);
    expect(result.isValid && result.isCompany).toEqual(true);
  });

  // Made-up numbers with a correct check digit
  test.each(['4200123450004', '4800123450001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.isCompany).toEqual(true);
  });

  // 43: sole proprietor
  it('validate:4300123450009', () => {
    const result = validate('4300123450009');

    expect(result.isValid && result.isIndividual).toEqual(true);
  });

  // 41 (UIO), 5xx and 6: no published numbers to confirm the check digit,
  // so only the structure is checked
  test.each(['4112345678901', '5001234567890', '6123456789012'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toEqual(true);
    },
  );

  test.each(['4200211100006', '4400958880008'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // Remainder 0: such numbers are not issued, whatever the last digit
  test.each(['4600123450010', '4600123450011'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  test.each([
    '4012345678901',
    '4712345678901',
    '5051234567890',
    '1234567890123',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  test.each(['420021110000', '42002111000050'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:420021110000A', () => {
    const result = validate('420021110000A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
