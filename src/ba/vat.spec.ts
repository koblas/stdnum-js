import { validate, format } from './vat';
import { InvalidLength, InvalidFormat, InvalidChecksum } from '../exceptions';

describe('ba/vat', () => {
  it('format:200211100005', () => {
    const result = format('BA 200211100005');

    expect(result).toEqual('200211100005');
  });

  // The PDV number is the JIB without its leading 4
  test.each([
    ['200211100005', '200211100005'], // BH Telecom d.d. Sarajevo
    ['BA400958880009', '400958880009'], // UniCredit Bank a.d. Banja Luka
  ])('validate:%s', (value, want) => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(want);
  });

  it('validate:200211100006', () => {
    const result = validate('200211100006');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  test.each(['20021110000', '4200211100005'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:20021110000A', () => {
    const result = validate('20021110000A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
