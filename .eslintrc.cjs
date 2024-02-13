/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
      '**/dist/*'
  ],
  plugins: ['@typescript-eslint'],
  root: true,
};