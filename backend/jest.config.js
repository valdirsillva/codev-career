module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  transformIgnorePatterns: [
    '/node_modules/', // padrão padrão para ignorar node_modules
    './dist/', // adiciona esta linha para ignorar a pasta dist
  ],
};