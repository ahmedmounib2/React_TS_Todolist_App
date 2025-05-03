import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.Config} */
export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.json', '.css'], // 👈 add this line
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: eslintPluginReact,
      'jsx-a11y': eslintPluginJsxA11y,
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      // Core ESLint rules
      'no-unused-vars': 'warn', // warn if you declare variables but don't use them
      'no-console': 'warn', // warn if you leave console.logs
      eqeqeq: ['error', 'always'], // force === instead of ==

      // TypeScript specific
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // unused function args are okay if named like _something
      '@typescript-eslint/explicit-function-return-type': 'off', // don't force function return types (optional early)
      '@typescript-eslint/no-explicit-any': 'warn', // warn if you use 'any' type (useful in early days)

      // React specific
      'react/react-in-jsx-scope': 'off', // React 17+ doesn't need import React
      'react/prop-types': 'off', // because you're using TypeScript types instead
      'react/jsx-uses-react': 'off', // React 17+ JSX runtime
      'react-hooks/rules-of-hooks': 'error', // strong rules for React Hooks
      'react-hooks/exhaustive-deps': 'warn', // warn if missing deps in useEffect

      // Accessibility (a11y)
      'jsx-a11y/alt-text': 'warn', // warn if missing alt text in images
      'jsx-a11y/anchor-is-valid': 'warn', // warn if <a> tags have no href
    },
  },
];
