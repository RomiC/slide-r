module.exports = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfigFile: '../tsconfig.json'
    }
  },
  rootDir: 'tests/',
  testRegex: '\\.spec\\.(js|jsx|ts|tsx)$'
};