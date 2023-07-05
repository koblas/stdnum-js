import {
  luhnChecksumDigit,
  luhnChecksumValue,
  mod11mod10Validate,
  mod97base10Validate,
} from './checksum';

describe('util/checksum', () => {
  describe('luhnChecksumValue', () => {
    it('basic', () => {
      expect(luhnChecksumValue('7894')).toEqual(6);
    });
  });

  describe('luhnChecksumDigit', () => {
    it.each([
      ['7894', '9'],
      ['8667046', '0'],
    ])(
      'luhnChecksumDigit %s should return %s',
      (digits: string, expectedResult: string) => {
        expect(luhnChecksumDigit(digits)).toEqual(expectedResult);
      },
    );
  });

  describe('mod97base10Validate', () => {
    test.each(['9999123456789012141490', '08686001256515001121751'])(
      'value:%s',
      value => {
        expect(mod97base10Validate(value)).toBe(true);
      },
    );
  });

  describe('mod11mod10Validate', () => {
    test.each([
      '07945',
      '794623',
      '002006673085',
      '65112243004304827',
      '532668787803570012647762156873137851288684',
      '0032',
      '78463064456075552581616161662',
      '8615430533535456311886713716284873171332581774130',
      '45557738808',
      '710652041271831466162726767146582126527534',
      '47166',
      '680584514238577341080173637733642828500321',
      '46746786646531',
      '423280260',
      '5003002243435846626846005060042255674451267241175',
      '654280720481568053641275304858644021632559',
      '3086551843863',
      '43177541563430485407585286786376851344',
      '46000342367741',
      '13858121045117455586725505241387248109',
      '15631047568645066248754360824525460366184664246',
      '716606185585077454311714605',
      '36760125602740581257256826035731224471746311354',
      '8537',
    ])('validate:%s', value => {
      expect(mod11mod10Validate(value)).toBe(true);
    });

    test.each(['17945', '17944'])('invalid:%s', value => {
      expect(mod11mod10Validate(value)).toBe(false);
    });
  });
});
