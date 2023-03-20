/**  @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'index.ts',
    'app.ts',
    'src/routers',
    './src/repositories/users/users.mongo.model.ts',
    './src/config.ts',
    './src/repositories/plants/plants.mongo.model.ts',
    './src/mocks/mockTest.ts',
  ],
};
