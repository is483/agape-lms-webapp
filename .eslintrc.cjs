module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    "max-len": ["error", { "ts": 150 }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'function-paren-newline': 'off',
    'no-use-before-define': ['error', { 'functions': false, 'variables': false }],
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx', '.ts'] }],
    'semi': [2, 'never'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-shadow': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'no-absolute-path': 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ]
    }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never',
      }
    ]
  },
  extends: ['airbnb', 'airbnb/hooks'],
}
