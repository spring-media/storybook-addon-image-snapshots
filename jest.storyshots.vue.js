// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const cwd = process.cwd();

module.exports = {
  clearMocks: true,

  moduleFileExtensions: ['vue', 'js', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    '^(.*.svg)\\?inline': `${cwd}/tests/unit/transforms/svg-inline.js`,
    '^@/(.*)$': `${cwd}/$1`,
  },

  setupFiles: [`${__dirname}/.jest/register-context.js`],

  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '.*\\.(vue)$': 'jest-vue-preprocessor',
    '.+\\.(css|ico|sass|scss|svg|png|jpg|ttf|woff|woff2|xml|webmanifest|md)$': 'jest-transform-stub',
  },

  transformIgnorePatterns: [],

  testPathIgnorePatterns: [],
};
