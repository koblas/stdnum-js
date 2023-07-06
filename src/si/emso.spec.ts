import { validate } from './emso';

describe('si/emso', () => {
  test.each([
    '0101006500006',
    '1211981500126',
    '1508995500237',
    '2001939010010',
    '2902932505526',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });
});
