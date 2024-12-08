export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
  };