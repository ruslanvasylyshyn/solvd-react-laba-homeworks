module.exports = {
  testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': '<rootDir>/styleMock.js',
      '\\.(svg|jpg|jpeg|png)$': 'jest-transform-stub',
    },
  };
  