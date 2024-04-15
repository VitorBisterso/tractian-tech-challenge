const config = {
   verbose: true,
   testEnvironment: 'jest-environment-jsdom',
   clearMocks: true,
   collectCoverage: true,
   preset: 'ts-jest',
   collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/*.d.ts',
      '!src/main.tsx',
      '!src/models/**/*.ts',
      '!src/tests/**/*.ts',
      '!__mocks__/',
   ],
   coverageDirectory: 'coverage',
   coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
   coverageProvider: 'v8',
   maxWorkers: '50%',
   testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
   transform: {
      '^.+\\.(t|j)sx?$': 'ts-jest',
   },
   roots: ['<rootDir>'],
   moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
         '<rootDir>/__mocks__/fileMock.js',
      '\\.(css|sass)$': '<rootDir>/__mocks__/styleMock.js',
      '@/(.*)': '<rootDir>/src/$1',
   },
   setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
};

module.exports = config;
