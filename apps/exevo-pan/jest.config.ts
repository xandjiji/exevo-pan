export default {
  testEnvironment: 'jsdom',
  rootDir: '../..',
  setupFilesAfterEnv: ['<rootDir>/apps/exevo-pan/setupTests.js'],
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next',
    '<rootDir>/packages/',
    'mock.ts',
    'utils.ts',
    'types.ts',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$':
      '<rootDir>/apps/exevo-pan/__mocks__/fileMock.js',
    '\\.css$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
}
