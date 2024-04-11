module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
      'airbnb',
      'airbnb-typescript',
   ],
   ignorePatterns: ['dist', '.eslintrc.cjs'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      project: './tsconfig.json',
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['react-refresh', 'prettier', '@typescript-eslint'],
   settings: {
      'import/resolver': {
         typescript: {
            alwaysTryTypes: true,
         },
      },
   },
   rules: {
      'prettier/prettier': [
         'warn',
         {
            endOfLine: 'auto',
         },
      ],
      'react/jsx-indent': 'off',
      '@typescript-eslint/indent': 'off',
      'react-refresh/only-export-components': [
         'warn',
         { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
      'import/no-extraneous-dependencies': [
         'error',
         {
            devDependencies: [
               '**/*.test.js',
               '**/*.test.jsx',
               '**/*.test.ts',
               '**/*.test.tsx',
               'src/tests/**/*',
            ],
         },
      ],
      'import/extensions': [
         'error',
         'ignorePackages',
         {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
         },
      ],
   },
};
