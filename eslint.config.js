// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc'
import prettier from 'eslint-plugin-prettier'

const compat = new FlatCompat()

export default [
  ...compat.extends('standard', 'prettier'),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        node: true
      }
    },
    plugins: {
      prettier
    },
    rules: {
      'comma-dangle': ['error', 'never'],
      'no-cond-assign': 'error',
      'no-console': 'warn',
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty-character-class': 'error',
      'no-empty': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'warn',
      'no-obj-calls': 'warn',
      'no-regex-spaces': 'warn',
      'no-sparse-arrays': 'warn',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'use-isnan': 'error',
      'valid-jsdoc': 'warn',
      'valid-typeof': 'error',
      'require-jsdoc': 'warn',
      'prettier/prettier': 'error'
    },
    ignores: ['prisma/**', '.vscode/*', 'commitlint.config.js']
  }
]
