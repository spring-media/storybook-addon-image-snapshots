// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    '@storybook/html': '<rootDir>/node_modules/@storybook/html',
  },
  testMatch: ['<rootDir>/stories/*.runner.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};
