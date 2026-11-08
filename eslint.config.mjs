import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  eslintConfigPrettier,
  {
    ignores: ['lib/*'],
  },
  {
    rules: {
      // String.prototype.substr is a legacy (Annex B) method, and its
      // (start, length) arguments are easy to confuse with substring's
      // (start, end).
      'no-restricted-properties': [
        'error',
        {
          property: 'substr',
          message: 'Use slice() instead (substr is a legacy method).',
        },
      ],
    },
  },
);
