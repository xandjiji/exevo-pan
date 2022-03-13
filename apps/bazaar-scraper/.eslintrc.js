const config = require('config/eslint-node')

module.exports = {
  ...config,
  parserOptions: {
    ...config.parserOptions,
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    ...config.rules,
    'class-methods-use-this': 'off',
  },
}
