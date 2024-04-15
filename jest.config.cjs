const config = {
   testEnvironment: 'jest-environment-jsdom',
   clearMocks: true,
   collectCoverage: true,
   preset: 'ts-jest',
   collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
   coverageDirectory: 'coverage',
   coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
   coverageProvider: 'v8',
   maxWorkers: '50%',
   testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
   transform: {
      '^.+\\.(t|j)sx?$': 'ts-jest',
   },
   moduleNameMapper: {
      '@/(.*)': '<rootDir>/src/$1',
   },
   roots: ['<rootDir>'],
};

module.exports = config;
