/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ["<rootDir>/server/", "<rootDir>/game-engine/build/"] // todo - figure out how to run all tests in one jest run
};
