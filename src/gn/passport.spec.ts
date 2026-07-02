import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('gn/passport', () => {
  it('format:186100101190310', () => {
    const result = format('186100101190310');

    expect(result).toEqual('186100101190310');
  });

  test.each(['186100101190310', '194101000507883'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A86100101190310'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456', '18610010119031', '1111111111111111'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );
});
