import typescriptEslint from '@typescript-eslint/eslint-plugin';
import html from 'eslint-plugin-html';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  { ignores: ['**/dist', '**/*.json'] },
  ...compat.extends(
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vitest-globals/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      html,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',
    },

    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@packages', './src/packages'],
            ['@utils', './src/utils'],
          ],
          extensions: ['.ts', '.js', '.json'],
        },

        node: {
          extensions: ['.ts', '.js', '.json', '.d.ts'],
        },
      },
    },

    rules: {
      'max-len': [
        2,
        {
          code: 150,
          tabWidth: 2,
          ignoreUrls: true,
        },
      ],

      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],

      'object-curly-newline': [
        'error',
        {
          ImportDeclaration: {
            multiline: true,
            minProperties: 6,
          },

          ExportDeclaration: {
            multiline: true,
            minProperties: 6,
          },
        },
      ],

      'no-useless-constructor': 'off',

      'no-param-reassign': [
        2,
        {
          props: false,
        },
      ],

      '@typescript-eslint/no-useless-constructor': ['error'],

      'class-methods-use-this': [
        'error',
        {
          exceptMethods: ['verifyToken', 'getPemFromDecodedJwt'],
        },
      ],

      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
