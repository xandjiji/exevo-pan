module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  ignorePatterns: ['**/*.js', '**/*.json', 'node_modules'],
}
