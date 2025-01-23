
module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  transformIgnorePatterns: [
    '/node_modules/', // padrão padrão para ignorar node_modules
    './dist/', // adiciona esta linha para ignorar a pasta dist
  ],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
};