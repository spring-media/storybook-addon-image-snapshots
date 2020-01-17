// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  rootDir: '../',

  clearMocks: true,

  moduleFileExtensions: ['vue', 'js', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    '^(.*.svg)\\?inline': `<rootDir>/tests/unit/transforms/svg-inline.js`,
    '^@/(.*)$': `<rootDir>/$1`,
  },

  setupFiles: [`${__dirname}/register-context.js`],

  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '.*\\.(vue)$': 'jest-vue-preprocessor',
    '.+\\.(css|ico|sass|scss|svg|png|jpg|ttf|woff|woff2|xml|webmanifest|md)$': 'jest-transform-stub',
  },

  transformIgnorePatterns: []
};
