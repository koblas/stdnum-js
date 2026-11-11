import { stdnum } from './index';
import * as ean from './gen/ean';
import { Validator } from './types';

// Every validator documents at least one example number and the patterns its
// format() output follows (n = digit, a = letter A-Z, c = digit or letter A-Z,
// anything else is literal). See issue #108.

function patternToRegExp(pattern: string): RegExp {
  const body = [...pattern]
    .map(ch => {
      if (ch === 'n') return '[0-9]';
      if (ch === 'a') return '[A-Z]';
      if (ch === 'c') return '[0-9A-Z]';

      return ch.replace(/[.*+?^${}()|[\]\\/-]/g, '\\$&');
    })
    .join('');

  return new RegExp(`^${body}$`);
}

const validators: [string, Validator][] = [
  ...Object.entries(stdnum).flatMap(([country, numbers]) =>
    Object.entries(numbers).map(([key, validator]): [string, Validator] => [
      `${country.toLowerCase()}/${key}`,
      validator,
    ]),
  ),
  ['gen/ean', ean],
];

describe('validator examples and formats', () => {
  it('finds the validators', () => {
    expect(validators.length).toBeGreaterThan(300);
  });

  it('converts a pattern to a regular expression', () => {
    expect(patternToRegExp('nnn.nnn.nnn-nn').test('390.533.447-05')).toBe(true);
    expect(patternToRegExp('nnn.nnn.nnn-nn').test('390x533.447-05')).toBe(
      false,
    );
    expect(patternToRegExp('CHE-nnn').test('CHE-123')).toBe(true);
    expect(patternToRegExp('CHE-nnn').test('CHX-123')).toBe(false);
    expect(patternToRegExp('ac').test('A1')).toBe(true);
    expect(patternToRegExp('ac').test('1A')).toBe(false);
  });

  describe.each(validators)('%s', (_, validator) => {
    const { examples = [], formats = [] } = validator;

    it('has examples and formats', () => {
      expect(examples.length).toBeGreaterThan(0);
      expect(formats.length).toBeGreaterThan(0);
    });

    it.each(examples)('example %s is valid and compact', example => {
      expect(validator.validate(example).isValid).toBe(true);
      expect(validator.compact(example)).toEqual(example);
    });

    it.each(examples)('format(%s) matches a declared format', example => {
      const formatted = validator.format(example);

      expect(formats.some(f => patternToRegExp(f).test(formatted))).toBe(true);
    });
  });
});
