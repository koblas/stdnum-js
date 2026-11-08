import { validate, format } from './tin';
import { InvalidLength, InvalidFormat, InvalidComponent } from '../exceptions';

describe('fj/tin', () => {
  it('format:501234567', () => {
    const result = format('50-1234567');

    expect(result).toEqual('501234567');
  });

  // Legacy 9 digit TINs: the first two digits give the registration type
  test.each([
    ['011234567', true, false], // individual
    ['261234567', true, false], // individual
    ['501234567', false, true], // company
    ['751234567', false, true], // trust
    ['901234567', false, true], // government
  ])('validate:%s', (value, individual, company) => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(value);
    expect(result.isValid && result.isIndividual).toEqual(individual);
    expect(result.isValid && result.isCompany).toEqual(company);
  });

  // TINs from the online portal: 10 digits starting with 29
  it('validate:2912345678', () => {
    const result = validate('2912345678');

    expect(result.isValid && result.compact).toEqual('2912345678');
  });

  test.each(['001234567', '271234567', '311234567', '991234567', '3012345678'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidComponent);
    },
  );

  test.each(['12345678', '29123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:50123456A', () => {
    const result = validate('50123456A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});
