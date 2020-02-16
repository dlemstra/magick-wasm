module.exports = {
  preset: 'ts-jest',
  testEnvironment: './tests/custom-environment',
  globals: {
    'ts-jest': {
      tsConfig: {
        esModuleInterop: false
      }
    }
  }
};