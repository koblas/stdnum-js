// import PREFIXES from 'gb/nino-prefixes';
import * as exceptions from '../../exceptions';

// Map visually similar unicode values to ASCII
// - solves the cut-n-paste from PDF/Word
const mapped: Record<string, string> = {
  '-': '-', // HYPHEN-MINUS
  '\u{00AD}': '-', // SOFT HYPHEN
  '\u{00AF}': '-', // MACRON
  '\u{02D7}': '-', // MODIFIER LETTER MINUS SIGN
  '\u{058A}': '-', // ARMENIAN HYPHEN
  '\u{05BE}': '-', // HEBREW PUNCTUATION MAQAF
  '\u{180A}': '-', // MONGOLIAN NIRUGU
  '\u{2010}': '-', // HYPHEN
  '\u{2011}': '-', // NON-BREAKING HYPHEN
  '\u{2012}': '-', // FIGURE DASH
  '\u{2013}': '-', // EN DASH
  '\u{2014}': '-', // EM DASH
  '\u{2015}': '-', // HORIZONTAL BAR
  '\u{203E}': '-', // OVERLINE
  '\u{2043}': '-', // HYPHEN BULLET
  '\u{207B}': '-', // SUPERSCRIPT MINUS
  '\u{208B}': '-', // SUBSCRIPT MINUS
  '\u{2212}': '-', // MINUS SIGN
  '\u{23AF}': '-', // HORIZONTAL LINE EXTENSION
  '\u{23BA}': '-', // HORIZONTAL SCAN LINE-1
  '\u{23BB}': '-', // HORIZONTAL SCAN LINE-3
  '\u{23BC}': '-', // HORIZONTAL SCAN LINE-7
  '\u{23BD}': '-', // HORIZONTAL SCAN LINE-9
  '\u{23E4}': '-', // STRAIGHTNESS
  '\u{FF0D}': '-', // FULLWIDTH HYPHEN-MINUS
  '\u{FE63}': '-', // SMALL HYPHEN-MINUS
  '\u{FFE3}': '-', // FULLWIDTH MACRON

  '*': '*',
  '\u{066D}': '*', // ARABIC FIVE POINTED STAR
  '\u{070D}': '*', // SYRIAC HARKLEAN ASTERISCUS
  '\u{2055}': '*', // FLOWER PUNCTUATION MARK
  '\u{A60E}': '*', // VAI FULL STOP
  '\u{2217}': '*', // ASTERISK OPERATOR
  '\u{22C6}': '*', // STAR OPERATOR
  '\u{204E}': '*', // LOW ASTERISK
  '\u{2731}': '*', // HEAVY ASTERISK
  '\u{2732}': '*', // OPEN CENTRE ASTERISK
  '\u{2733}': '*', // EIGHT SPOKED ASTERISK
  '\u{273A}': '*', // SIXTEEN POINTED ASTERISK
  '\u{273B}': '*', // TEARDROP-SPOKED ASTERISK
  '\u{273C}': '*', // OPEN CENTRE TEARDROP-SPOKED ASTERISK
  '\u{273D}': '*', // HEAVY TEARDROP-SPOKED ASTERISK
  '\u{2743}': '*', // HEAVY TEARDROP-PINWHEEL ASTERISK
  '\u{2749}': '*', // BALLON-SPOKED ASTERISK
  '\u{274A}': '*', // EIGHT TEARDROP-SPOKED PROPELLER ASTERISK
  '\u{274B}': '*', // HEAVY EIGHT TEARDROP-SPOKED PROPELLER ASTERISK
  '\u{FE61}': '*', // SMALL ASTERISK
  '\u{FF0A}': '*', // FULLWIDTH ASTERISK

  ',': ',',
  '\u{00B8}': ',', // CEDILLA
  '\u{060C}': ',', // ARABIC COMMA
  '\u{066B}': ',', // ARABIC DECIMAL SEPARATOR
  '\u{066C}': ',', // ARABIC THOUSANDS SEPARATOR
  '\u{201A}': ',', // SINGLE LOW-9 QUOTATION MARK
  '\u{2032}': ',', // PRIME
  '\u{2E34}': ',', // RAISED COMMA
  '\u{3001}': ',', // IDEOGRAPHIC COMMA
  '\u{FF0C}': ',', // FULLWIDTH COMMA
  '\u{FE11}': ',', // PRESENTATION FORM FOR VERTICAL COMMA
  '\u{FE50}': ',', // SMALL COMMA
  '\u{FE51}': ',', // SMALL IDEOGRAPHIC COMMA
  '\u{FF64}': ',', // HALFWIDTH IDEOGRAPHIC COMMA

  '.': '.', // FULL STOP
  '\u{00B7}': '.', // MIDDLE DOT
  '\u{02D9}': '.', // DOT ABOVE
  '\u{0387}': '.', // GREEK ANO TELEIA
  '\u{06D4}': '.', // ARABIC FULL STOP
  '\u{0701}': '.', // SYRIAC SUPRALINEAR FULL STOP
  '\u{0702}': '.', // SYRIAC SUBLINEAR FULL STOP
  '\u{0830}': '.', // SAMARITAN PUNCTUATION NEQUDAA
  '\u{0F0B}': '.', // TIBETAN MARK INTERSYLLABIC TSHEG
  '\u{0F0C}': '.', // TIBETAN MARK DELIMITER TSHEG BSTAR
  // prettier-ignore
  "\u{1427}": ".", // CANADIAN SYLLABICS FINAL MIDDLE DOT
  '\u{16EB}': '.', // RUNIC SINGLE PUNCTUATION
  '\u{2219}': '.', // BULLET OPERATOR
  '\u{2022}': '.', // BULLET
  '\u{2024}': '.', // ONE DOT LEADER
  '\u{2027}': '.', // HYPHENATION POINT
  '\u{22C5}': '.', // DOT OPERATOR
  '\u{2E31}': '.', // WORD SEPARATOR MIDDLE DOT
  '\u{2E33}': '.', // RAISED DOT
  '\u{3002}': '.', // IDEOGRAPHIC FULL STOP
  '\u{30FB}': '.', // KATAKANA MIDDLE DOT
  '\u{FE52}': '.', // SMALL FULL STOP
  '\u{FF0E}': '.', // FULLWIDTH FULL STOP
  '\u{FF65}': '.', // HALFWIDTH KATAKANA MIDDLE DOT
  '\u{FBB2}': '.', // ARABIC SYMBOL DOT ABOVE
  '\u{FBB3}': '.', // ARABIC SYMBOL DOT BELOW
  '\u{10101}': '.', // AEGEAN WORD SEPARATOR DOT
  '\u{1091F}': '.', // PHOENICIAN WORD SEPARATOR
  '\u{10A50}': '.', // KHAROSHTHI PUNCTUATION DOT

  '/': '/',
  '\u{2044}': '/', // FRACTION SLASH
  '\u{2215}': '/', // DIVISION SLASH
  '\u{29F8}': '/', // BIG SOLIDUS
  '\u{FF0F}': '/', // FULLWIDTH SOLIDUS
  '\u{083C}': '/', // SAMARITAN PUNCTUATION ARKAANU
  '\u{27CB}': '/', // MATHEMATICAL RISING DIAGONAL

  ':': ':',
  '\u{1361}': ':', // ETHIOPIC WORDSPACE
  '\u{16EC}': ':', // RUNIC MULTIPLE PUNCTUATION
  '\u{1804}': ':', // MONGOLIAN COLON
  '\u{FE13}': ':', // PRESENTATION FORM FOR VERTICAL COLON
  '\u{FE30}': ':', // PRESENTATION FORM FOR VERTICAL TWO DOT LEADER
  '\u{FF1A}': ':', // FULLWIDTH COLON
  '\u{FE55}': ':', // SMALL COLON

  ' ': ' ',
  '\u{0009}': ' ', // TAB
  '\u{000B}': ' ', // VERTICAL TAB
  '\u{000C}': ' ', // FORM FEED
  '\u{00A0}': ' ', // NO-BREAK-SPACE
  '\u{1680}': ' ', // Ogham Space Mark
  '\u{2000}': ' ', // EN QUAD
  '\u{2001}': ' ', // EM QUAD
  '\u{2002}': ' ', // EN SPACE
  '\u{2003}': ' ', // EM SPACE
  '\u{2004}': ' ', // THREE-PER-EM SPACE
  '\u{2005}': ' ', // FOUR-PER-EM SPACE
  '\u{2006}': ' ', // SIX-PER-EM SPACE
  '\u{2007}': ' ', // FIGURE SPACE
  '\u{2008}': ' ', // PUNCTUATION SPACE
  '\u{2009}': ' ', // THIN SPACE
  '\u{200A}': ' ', // HAIR SPACE
  '\u{2028}': ' ', // LINE SEPARATOR
  '\u{2029}': ' ', // PARAGRAPH SEPARATOR
  '\u{202F}': ' ', // NARROW NO-BREAK SPACE
  '\u{205F}': ' ', // MEDIUM MATHEMATICAL SPACE
  '\u{3000}': ' ', // IDEOGRAPHIC SPACE

  "'": "'",
  '\u{0060}': "'", // GRAVE ACCENT
  '\u{00B4}': "'", // ACUTE ACCENT
  // prettier-ignore
  "\u{02BE}": "'", // MODIFIER LETTER RIGHT HALF RING
  // prettier-ignore
  "\u{02BF}": "'", // MODIFIER LETTER LEFT HALF RING
  // prettier-ignore
  "\u{02B9}": "'", // MODIFIER LETTER PRIME
  // prettier-ignore
  "\u{02BB}": "'", // MODIFIER LETTER TURNED COMMA
  // prettier-ignore
  "\u{02BC}": "'", // MODIFIER LETTER APOSTROPHE
  // prettier-ignore
  "\u{02C8}": "'", // MODIFIER LETTER VERTICAL LINE
  // prettier-ignore
  "\u{0300}":"'", // COMBINING GRAVE ACCENT
  '\u{0301}': "'", // COMBINING ACUTE ACCENT
  '\u{0312}': "'", // COMBINING TURNED COMMA ABOVE
  '\u{0313}': "'", // COMBINING COMMA ABOVE
  '\u{055A}': "'", // ARMENIAN APOSTROPHE
  '\u{201B}': "'", // SINGLE HIGH-REVERSED-9 QUOTATION MARK
  '\u{2018}': "'", // LEFT SINGLE QUOTATION MARK
  '\u{2019}': "'", // RIGHT SINGLE QUOTATION MARK

  '0': '0',
  '\u{0660}': '0', // ARABIC-INDIC DIGIT ZERO
  '\u{06F0}': '0', // EASTERN-ARABIC DIGIT ZERO
  '\u{FF10}': '0', // FULLWIDTH DIGIT ZERO
  '\u{1D7CE}': '0', // MATHEMATICAL BOLD DIGIT ZERO
  '\u{1D7D8}': '0', // MATHEMATICAL DOUBLE-STRUCK DIGIT ZERO
  '\u{1D7E2}': '0', // MATHEMATICAL SANS-SERIF DIGIT ZERO
  '\u{1D7EC}': '0', // MATHEMATICAL SANS-SERIF BOLD DIGIT ZERO
  '\u{1D7F6}': '0', // MATHEMATICAL MONOSPACE DIGIT ZERO

  '1': '1',
  '\u{0661}': '1', // ARABIC-INDIC DIGIT ONE
  '\u{06F1}': '1', // EASTERN-ARABIC DIGIT ONE
  '\u{FF11}': '1', // FULLWIDTH DIGIT ONE
  '\u{1D7CF}': '1', // MATHEMATICAL BOLD DIGIT ONE
  '\u{1D7D9}': '1', // MATHEMATICAL DOUBLE-STRUCK DIGIT ONE
  '\u{1D7E3}': '1', // MATHEMATICAL SANS-SERIF DIGIT ONE
  '\u{1D7ED}': '1', // MATHEMATICAL SANS-SERIF BOLD DIGIT ONE
  '\u{1D7F7}': '1', // MATHEMATICAL MONOSPACE DIGIT ONE

  '2': '2',
  '\u{06F2}': '2', // EASTERN-ARABIC DIGIT TWO
  '\u{0662}': '2', // ARABIC-INDIC DIGIT TWO
  '\u{FF12}': '2', // FULLWIDTH DIGIT TWO
  '\u{1D7D0}': '2', // MATHEMATICAL BOLD DIGIT TWO
  '\u{1D7DA}': '2', // MATHEMATICAL DOUBLE-STRUCK DIGIT TWO
  '\u{1D7E4}': '2', // MATHEMATICAL SANS-SERIF DIGIT TWO
  '\u{1D7EE}': '2', // MATHEMATICAL SANS-SERIF BOLD DIGIT TWO
  '\u{1D7F8}': '2', // MATHEMATICAL MONOSPACE DIGIT TWO

  '3': '3',
  '\u{06F3}': '3', // EASTERN-ARABIC DIGIT THREE
  '\u{0663}': '3', // ARABIC-INDIC DIGIT THREE
  '\u{FF13}': '3', // FULLWIDTH DIGIT THREE
  '\u{1D7D1}': '3', // MATHEMATICAL BOLD DIGIT THREE
  '\u{1D7DB}': '3', // MATHEMATICAL DOUBLE-STRUCK DIGIT THREE
  '\u{1D7E5}': '3', // MATHEMATICAL SANS-SERIF DIGIT THREE
  '\u{1D7EF}': '3', // MATHEMATICAL SANS-SERIF BOLD DIGIT THREE
  '\u{1D7F9}': '3', // MATHEMATICAL MONOSPACE DIGIT THREE

  '4': '4',
  '\u{06F4}': '4', // EASTERN-ARABIC DIGIT FOUR
  '\u{0664}': '4', // ARABIC-INDIC DIGIT FOUR
  '\u{FF14}': '4', // FULLWIDTH DIGIT FOUR
  '\u{1D7D2}': '4', // MATHEMATICAL BOLD DIGIT FOUR
  '\u{1D7DC}': '4', // MATHEMATICAL DOUBLE-STRUCK DIGIT FOUR
  '\u{1D7E6}': '4', // MATHEMATICAL SANS-SERIF DIGIT FOUR
  '\u{1D7F0}': '4', // MATHEMATICAL SANS-SERIF BOLD DIGIT FOUR
  '\u{1D7FA}': '4', // MATHEMATICAL MONOSPACE DIGIT FOUR

  '5': '5',
  '\u{06F5}': '5', // EASTERN-ARABIC DIGIT FIVE
  '\u{0665}': '5', // ARABIC-INDIC DIGIT FIVE
  '\u{FF15}': '5', // FULLWIDTH DIGIT FIVE
  '\u{1D7D3}': '5', // MATHEMATICAL BOLD DIGIT FIVE
  '\u{1D7DD}': '5', // MATHEMATICAL DOUBLE-STRUCK DIGIT FIVE
  '\u{1D7E7}': '5', // MATHEMATICAL SANS-SERIF DIGIT FIVE
  '\u{1D7F1}': '5', // MATHEMATICAL SANS-SERIF BOLD DIGIT FIVE
  '\u{1D7FB}': '5', // MATHEMATICAL MONOSPACE DIGIT FIVE

  '6': '6',
  '\u{06F6}': '6', // EASTERN-ARABIC DIGIT SIX
  '\u{0666}': '6', // ARABIC-INDIC DIGIT SIX
  '\u{FF16}': '6', // FULLWIDTH DIGIT SIX
  '\u{1D7D4}': '6', // MATHEMATICAL BOLD DIGIT SIX
  '\u{1D7DE}': '6', // MATHEMATICAL DOUBLE-STRUCK DIGIT SIX
  '\u{1D7E8}': '6', // MATHEMATICAL SANS-SERIF DIGIT SIX
  '\u{1D7F2}': '6', // MATHEMATICAL SANS-SERIF BOLD DIGIT SIX
  '\u{1D7FC}': '6', // MATHEMATICAL MONOSPACE DIGIT SIX

  '7': '7',
  '\u{06F7}': '7', // EASTERN-ARABIC DIGIT SEVEN
  '\u{0667}': '7', // ARABIC-INDIC DIGIT SEVEN
  '\u{FF17}': '7', // FULLWIDTH DIGIT SEVEN
  '\u{1D7D5}': '7', // MATHEMATICAL BOLD DIGIT SEVEN
  '\u{1D7DF}': '7', // MATHEMATICAL DOUBLE-STRUCK DIGIT SEVEN
  '\u{1D7E9}': '7', // MATHEMATICAL SANS-SERIF DIGIT SEVEN
  '\u{1D7F3}': '7', // MATHEMATICAL SANS-SERIF BOLD DIGIT SEVEN
  '\u{1D7FD}': '7', // MATHEMATICAL MONOSPACE DIGIT SEVEN

  '8': '8',
  '\u{06F8}': '8', // EASTERN-ARABIC DIGIT EIGHT
  '\u{0668}': '8', // ARABIC-INDIC DIGIT EIGHT
  '\u{FF18}': '8', // FULLWIDTH DIGIT EIGHT
  '\u{1D7D6}': '8', // MATHEMATICAL BOLD DIGIT EIGHT
  '\u{1D7E0}': '8', // MATHEMATICAL DOUBLE-STRUCK DIGIT EIGHT
  '\u{1D7EA}': '8', // MATHEMATICAL SANS-SERIF DIGIT EIGHT
  '\u{1D7F4}': '8', // MATHEMATICAL SANS-SERIF BOLD DIGIT EIGHT
  '\u{1D7FE}': '8', // MATHEMATICAL MONOSPACE DIGIT EIGHT

  // 9
  '9': '9',
  '\u{06F9}': '9', // EASTERN-ARABIC DIGIT NINE
  '\u{0669}': '9', // ARABIC-INDIC DIGIT NINE
  '\u{FF19}': '9', // FULLWIDTH DIGIT NINE
  '\u{1D7D7}': '9', // MATHEMATICAL BOLD DIGIT NINE
  '\u{1D7E1}': '9', // MATHEMATICAL DOUBLE-STRUCK DIGIT NINE
  '\u{1D7EB}': '9', // MATHEMATICAL SANS-SERIF DIGIT NINE
  '\u{1D7F5}': '9', // MATHEMATICAL SANS-SERIF BOLD DIGIT NINE
  '\u{1D7FF}': '9', // MATHEMATICAL MONOSPACE DIGIT NINE
};

/**
 * Clean up visually similar unicode values, by default
 * trim whitespace
 */
export function cleanUnicode(
  value: string,
  deletechars = ' ',
  stripPrefix?: string | string[],
): [string, exceptions.InvalidFormat | null] {
  if (typeof value !== 'string') {
    return ['', new exceptions.InvalidFormat()];
  }

  // Don't use value.split("") -- doesn't work for "high" unicode
  const cleaned = [...value]
    .map(c => mapped[c] ?? c)
    .filter(c => !deletechars.includes(c))
    .join('')
    .toLocaleUpperCase();

  if (stripPrefix && stripPrefix.length !== 0) {
    let prefix;

    if (Array.isArray(stripPrefix)) {
      prefix = stripPrefix.find(p => cleaned.startsWith(p));
    } else if (cleaned.startsWith(stripPrefix)) {
      prefix = stripPrefix;
    }

    if (prefix !== undefined) {
      return [cleaned.substring(prefix.length), null];
    }
  }

  return [cleaned, null];
}
